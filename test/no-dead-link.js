import rule from '../src/no-dead-link';
import TextlintTester from 'textlint-tester';

const tester = new TextlintTester();

tester.run('no-dead-link', rule, {
  valid: [
    'Normal URI: https://example.com/',
    'Normal link: [example](https://example.com/)',
    {
      text: 'Options: relative link: ![robot](index.html)',
      options: {
        checkRelative: true,
        baseURI: 'https://example.com/',
      },
    },
    {
      text: 'Options: ignore: https://example.com/404.html',
      options: {
        ignore: ['https://example.com/404.html'],
      },
    },
  ],
  invalid: [
    {
      text: '404 URI: https://example.com/404.html',
      errors: [
        {
          message: 'https://example.com/404.html is dead. (404 Not Found)',
          line: 1,
          column: 10,
        },
      ],
    },
    {
      text: '404 link: [404](https://example.com/404.html)',
      errors: [
        {
          message: 'https://example.com/404.html is dead. (404 Not Found)',
          line: 1,
          column: 11,
        },
      ],
    },
    {
      text: 'No base URI for relative URI: [no base](index.html)',
      options: {
        checkRelative: true,
      },
      errors: [
        {
          message: 'The base URI is not specified.',
          line: 1,
          column: 31,
        },
      ],
    },
  ],
});
