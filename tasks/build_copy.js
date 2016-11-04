/**
 * @file Copies the given folder as the output folder.
 *
 * Usage: node build_copy.js --src|-s <source> --dst|-d <destination>
 *
 * There is no error checking -- script fails at the first error. Stick to lowercase file names and extensions. Use UTF-8 file encoding.
 */

let command_line_args = require('command-line-args');
let fse = require('fs-extra');

let args = command_line_args([
  {
    name: 'src',
    alias: 's',
    type: String
  },
  {
    name: 'dst',
    alias: 'd',
    type: String
  }
]);

if (!args.src || !args.dst) {
  throw new Error('Usage: node build_copy.js --src|-s <source> --dst|-d <destination>');
}

fse.ensureDirSync(args.dst);
fse.copySync(args.src, args.dst);
