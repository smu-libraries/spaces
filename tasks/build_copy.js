/**
 * @file Copies additional files, like images and scripts, to the output folder.
 *
 * There is no error checking -- script fails at the first error. Stick to lowercase file names and extensions. Use UTF-8 file encoding.
 */

let fse = require('fs-extra');

fse.ensureDirSync('public');
fse.copySync('images', 'public/images')
