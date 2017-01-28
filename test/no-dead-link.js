/* eslint-disable max-len */
import TextlintTester from 'textlint-tester';
import rule from '../src/no-dead-link';

const tester = new TextlintTester();

tester.run('no-dead-link', rule, {
  valid: [
    'should be able to check a link in Markdown: [example](https://example.com/)',
    'should be able to check a URL in Markdown: https://example.com/',
    'should treat 200 OK as alive: http://httpstat.us/200',
    'should treat 301 Moved Permanently as alive: http://httpstat.us/301',
    {
      text: 'should be able to check a URL in a plain text: https://example.com/',
      ext: '.txt',
    },
    {
      text: 'should be able to check multiple URLs in a plain text: https://example.com/, http://httpstat.us/200',
      ext: '.txt',
    },
    {
      text: 'should be able to check relative pathes when checkRelative is true: ![robot](index.html)',
      options: {
        checkRelative: true,
        baseURI: 'https://example.com/',
      },
    },
    {
      text: 'should ignore URLs in the "ignore" option: https://example.com/404.html shouldn\'t be checked.',
      options: {
        ignore: ['https://example.com/404.html'],
      },
    },
  ],
  invalid: [
    {
      text: 'should treat 404 Not Found as dead: https://example.com/404.html',
      errors: [
        {
          message: 'https://example.com/404.html is dead. (404 Not Found)',
          line: 1,
          column: 37,
        },
      ],
    },
    {
      text: 'should treat 500 Internal Server Error as dead: http://httpstat.us/500',
      errors: [
        {
          message: 'http://httpstat.us/500 is dead. (500 Internal Server Error)',
          line: 1,
          column: 49,
        },
      ],
    },
    {
      text: 'should locate the exact index of a URL in a plain text: https://example.com/404.html',
      ext: '.txt',
      errors: [
        {
          message: 'https://example.com/404.html is dead. (404 Not Found)',
          line: 1,
          column: 57,
        },
      ],
    },
    {
      text: 'should throw "No base URI is provided" error if checkRelative is true but baseURI is undefined: [no base](index.html)',
      options: {
        checkRelative: true,
      },
      errors: [
        {
          message: 'The base URI is not specified.',
          line: 1,
          column: 97,
        },
      ],
    },
  ],
});
