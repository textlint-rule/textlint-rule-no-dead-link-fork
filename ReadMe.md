# textlint-rule-no-dead-link

[![textlint rule](https://img.shields.io/badge/textlint-fixable-green.svg?style=social)](https://textlint.github.io/)
[![Build Status](https://travis-ci.org/textlint-rule/textlint-rule-no-dead-link-fork.svg?branch=master)](https://travis-ci.org/textlint-rule/textlint-rule-no-dead-link-fork)
[![Dependency Status](https://david-dm.org/textlint-rule/textlint-rule-no-dead-link-fork.svg)](https://david-dm.org/textlint-rule/textlint-rule-no-dead-link-fork)
[![devDependency Status](https://david-dm.org/textlint-rule/textlint-rule-no-dead-link-fork/dev-status.svg)](https://david-dm.org/textlint-rule/textlint-rule-no-dead-link-fork#info=devDependencies)

> This is fork of [nodaguti/textlint-rule-no-dead-link](https://github.com/nodaguti/textlint-rule-no-dead-link "nodaguti/textlint-rule-no-dead-link").  
> For more details, see [Temporary fork · Issue #1 · textlint-rule/textlint-rule-no-dead-link-fork](https://github.com/textlint-rule/textlint-rule-no-dead-link-fork/issues/1 "Temporary fork · Issue #1 · textlint-rule/textlint-rule-no-dead-link-fork").

[textlint](https://github.com/textlint/textlint) rule
to make sure every link in a document is available.

The primary target of this rule is Markdown documents, while it may also work for plain text documents (See tests).

## Installation
```
$ npm install @textlint-rule/textlint-rule-no-dead-link
```

## Usage
```
$ npm install textlint textlint-rule-no-dead-link
$ textlint --rule textlint-rule-no-dead-link text-to-check.txt
```

## Options
Please write your configurations in `.textlintrc`.

The default options are:
```
{
  "rules": {
    "@textlint-rule/no-dead-link": {
      "checkRelative": false,
      "baseURI": null,
      "ignore": [],
    }
  }
}
```

### checkRelative
Enable the dead link checks against relative URIs or file path.

**Relative url**

You also have to specify the `baseURI` to make this option work.

**Relative file path**

You do not need to set `baseURI` option.

### baseURI
The base URI to be used for resolving relative URIs.

Example:
```
{
  "rules": {
    "@textlint-rule/no-dead-link": {
      "checkRelative": true,
      "baseURI": "http://example.com/"
    }
  }
}
```

### ignore
An array of URIs to be ignored, i.e. skipped from availability checks.

Example:
```
{
  "rules": {
    "@textlint-rule/no-dead-link": {
      "ignore": [
        "http://example.com/not-exist/index.html"
      ]
    }
  }
}
```

## Tests
```
npm test
```

## Contribution

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT License (http://nodaguti.mit-license.org/)
