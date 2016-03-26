import rule from '../src/no-dead-link';
import TextlintTester from 'textlint-tester';

const tester = new TextlintTester();

tester.run('no-dead-link', rule, {
  valid: [
    'Markdown > Link: [example](https://example.com/)',
    'Markdown > URL: https://example.com/',

    {
      text: 'Plain Text > URL: https://example.com/',
      ext: '.txt',
    },
    {
      text: 'Options > checkRelative: ![robot](index.html)',
      options: {
        checkRelative: true,
        baseURI: 'https://example.com/',
      },
    },
    {
      text: 'Options > ignore: https://example.com/404.html shouldn\'t be checked.',
      options: {
        ignore: ['https://example.com/404.html'],
      },
    },
  ],
  invalid: [
    {
      text: 'Markdown > URL > 404: https://example.com/404.html',
      errors: [
        {
          message: 'https://example.com/404.html is dead. (404 Not Found)',
          line: 1,
          column: 23,
        },
      ],
    },
    {
      text: 'Markdown > Link > 404: [404](https://example.com/404.html)',
      errors: [
        {
          message: 'https://example.com/404.html is dead. (404 Not Found)',
          line: 1,
          column: 24,
        },
      ],
    },
    {
      text: 'Options > checkRelative > No base URI is provided: [no base](index.html)',
      options: {
        checkRelative: true,
      },
      errors: [
        {
          message: 'The base URI is not specified.',
          line: 1,
          column: 52,
        },
      ],
    },
  ],
});
