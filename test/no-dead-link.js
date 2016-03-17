import rule from '../src/no-dead-link';
import TextlintTester from 'textlint-tester';

const tester = new TextlintTester();

tester.run('no-dead-link', rule, {
  valid: [
    'Normal URI: http://example.com/',
    'Normal link: [example](http://example.com)',
    {
      text: 'Options: relative link: ![robot](/images/errors/robot.gif)',
      options: {
        checkRelative: true,
        baseURI: 'https://www.google.com/',
      },
    },
    {
      text: 'Options: ignore: http://example.com/404',
      options: {
        ignore: ['http://example.com/404'],
      },
    },
  ],
  invalid: [
    {
      text: '404 URI: http://example.com/404',
      errors: [
        {
          message: 'http://example.com/404 is dead. (404 Not Found)',
          line: 1,
          column: 10,
        },
      ],
    },
    {
      text: '404 link: [404](http://example.com/404)',
      errors: [
        {
          message: 'http://example.com/404 is dead. (404 Not Found)',
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
