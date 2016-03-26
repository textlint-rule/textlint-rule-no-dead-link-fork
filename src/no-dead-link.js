import { RuleHelper } from 'textlint-rule-helper';
import fetch from 'isomorphic-fetch';
import URL from 'url';

const DEFAULT_OPTIONS = {
  checkRelative: false,
  baseURI: null,
  ignore: [],
};

// http://stackoverflow.com/a/3809435/951517
// eslint-disable-next-line max-len
const URI_REGEXP = /(https?:)?\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

function isRelative(uri) {
  return URL.parse(uri).protocol === null;
}

async function isAlive(uri) {
  try {
    const res = await fetch(uri, {
      method: 'HEAD',
      gzip: false,
    });
    return {
      ok: res.ok,
      message: `${res.status} ${res.statusText}`,
    };
  } catch (err) {
    return {
      ok: false,
      message: err.message,
    };
  }
}

function reporter(context, options = {}) {
  const {
    Syntax,
    getSource,
    report,
    RuleError,
  } = context;
  const helper = new RuleHelper(context);
  const opts = Object.assign({}, DEFAULT_OPTIONS, options);

  const lint = async ({ node, uri, index }) => {
    if (opts.ignore.indexOf(uri) !== -1) {
      return;
    }

    if (isRelative(uri)) {
      if (!opts.checkRelative) {
        return;
      }

      if (!opts.baseURI) {
        const message = 'The base URI is not specified.';
        report(node, new RuleError(message, { index: 0 }));
        return;
      }

      // eslint-disable-next-line no-param-reassign
      uri = URL.resolve(opts.baseURI, uri);
    }

    const { ok, message: msg } = await isAlive(uri);

    if (!ok) {
      const message = `${uri} is dead. (${msg})`;
      report(node, new RuleError(message, { index }));
    }
  };

  return {
    [Syntax.Str](node) {
      if (helper.isChildNode(node, [Syntax.BlockQuote])) {
        return null;
      }

      // prevent double checks
      if (helper.isChildNode(node, [Syntax.Link])) {
        return null;
      }

      return (async () => {
        const text = getSource(node);
        let matched;

        // eslint-disable-next-line no-cond-assign
        while ((matched = URI_REGEXP.exec(text))) {
          const uri = matched[0];
          const index = matched.index;
          await lint({ node, uri, index });
        }
      })();
    },

    [Syntax.Link](node) {
      if (helper.isChildNode(node, [Syntax.BlockQuote])) {
        return null;
      }

      return lint({
        node,
        uri: node.url,
        index: 0,
      });
    },
  };
}

export default {
  linter: reporter,
  fixer: reporter,
};
