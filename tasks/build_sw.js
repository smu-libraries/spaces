/**
 * @file Generates the service worker for precaching.
 *
 * Usage: node build_sw.js (--root|-r) <folder>
 *
 * There is no error checking -- script fails at the first error. Stick to lowercase file names and extensions. Use UTF-8 file encoding.
 */

let command_line_args = require('command-line-args');
let path = require('path');
let sw_precache = require ('sw-precache');

let args = command_line_args([
  {
    name: 'root',
    alias: 'r',
    type: String
  }
]);

if (!args.root) {
  throw new Error('Usage: node build_sw.js (--root|-r) <folder>');
}

let output_file = path.join(args.root, "service_worker.js");
sw_precache.write(output_file, {
  cacheId: 'spaces',
  staticFileGlobs: [args.root + '/**/*.*'],
  stripPrefix: args.root + '/'
}, (error) => {
  if (error) throw new Error(error);
});
