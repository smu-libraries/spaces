/**
 * @file Clears the given folders.
 *
 * Usage: node build_clean.js (--clean|-c) <folder> ...
 *
 * There is no error checking -- script fails at the first error. Stick to lowercase file names and extensions. Use UTF-8 file encoding.
 */

let command_line_args = require('command-line-args');
let fse = require('fs-extra');

let args = command_line_args([
  {
    name: 'clean',
    alias: 'c',
    type: String,
    multiple: true
  }
]);

if (!args.clean) {
  throw new Error('Usage: node build_clean.js (--clean|-c) <folder> ...');
}

args.clean.forEach((folder) => {
  fse.emptyDirSync(folder);
});
