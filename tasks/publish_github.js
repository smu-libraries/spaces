/**
 * @file Publishes the built site to GitHub Project Pages.
 *
 * There is no error checking -- script fails at the first error. Stick to lowercase file names and extensions. Use UTF-8 file encoding.
 */

let ghpages = require('gh-pages');

ghpages.publish('public', (err) => {
  console.error(err);
});
