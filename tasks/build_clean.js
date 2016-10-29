/**
 * @file Clears all the output and temp folders.
 *
 * There is no error checking -- script fails at the first error. Stick to lowercase file names and extensions. Use UTF-8 file encoding.
 */

let fse = require('fs-extra');

fse.emptyDirSync('out_hogan');
fse.emptyDirSync('public');
