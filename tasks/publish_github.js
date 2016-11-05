/**
 * @file Publishes the built site to GitHub Project Pages.
 *
 * Usage: node publish_github.js (--publish|-p) <folder>
 *
 * There is no error checking -- script fails at the first error. Stick to lowercase file names and extensions. Use UTF-8 file encoding.
 */

let command_line_args = require('command-line-args');

let args = command_line_args([
  {
    name: 'publish',
    alias: 'p',
    type: String
  }
]);

if (!args.publish) {
  throw new Error('Usage: node publish_github.js (--publish|-p) <folder>');
}

let ghpages = require('gh-pages');

ghpages.publish(args.publish, (err) => {
  if (err) console.error(err);
});
