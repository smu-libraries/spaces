/**
 * @file Minifies the pages (including inline CSS and JavaScript) and images in the given folder.
 *
 * Usage: node build_minify.js (--in|-i) <input> (--out|-o) <output>
 *
 * There is no error checking -- script fails at the first error. Stick to lowercase file names and extensions. Use UTF-8 file encoding.
 */

let path = require('path');
let command_line_args = require('command-line-args');
let fse = require('fs-extra');
let minify = require('html-minifier').minify;
let imagemin = require('imagemin');
let imagemin_jpegtran = require('imagemin-jpegtran');
let imagemin_optipng = require('imagemin-optipng');
let imagemin_svgo = require('imagemin-svgo');

let args = command_line_args([
  {
    name: 'in',
    alias: 'i',
    type: String
  },
  {
    name: 'out',
    alias: 'o',
    type: String
  }
]);

/**
 * Represents the builder that minifies the files.
 */
class Builder {
  /**
   * Minifies the pages and images in the given folder.
   *
   * @param {string} input_folder - The folder to check for files to minify.
   * @param {string} output_folder - The folder to saved minified files to.
   */
  minify(input_folder, output_folder) {
    /** Check the output folder */
    fse.ensureDirSync(output_folder);

    fse.readdirSync(input_folder).forEach((file) => {
      let input_path = path.join(input_folder, file);
      let output_path = path.join(output_folder, file);
      switch (path.extname(file)) {
        case '.html':
          let content = fse.readFileSync(input_path, 'utf8');
          content = this.minifyHtml(content);
          content = this.minifyLdJson(content);
          fse.writeFileSync(output_path, content);
          break;
        case '.jpg':
        case '.png':
        case '.svg':
          imagemin([input_path], output_folder, {
            plugins: [
              imagemin_jpegtran({ progressive: true }),
              imagemin_optipng(),
              imagemin_svgo()
            ]
          });
          break;
        default:
          /** The default action is to simply copy */
          fse.copySync(input_path, output_path);
          break;
      }
    }, this);
    return this;
  }

  /**
   * Minifies a HTML string (including inline CSS and JavaScript) using html-minifier.
   *
   * @param input {string} - The HTML string to minify.
   */
  minifyHtml(input) {
    return minify(input, {
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
      removeComments: true
    });
  }

  /**
   * Minifies a HTML string with an embedded ld+json script by removing the whitespace in the JSON data.
   *
   * @param input {string} - The HTML string to minify.
   */
  minifyLdJson(input) {
    let matches = /(^[^]*<script type="application\/ld\+json">)([^]*)(<\/script>[^]*$)/.exec(input);
    return matches ? matches[1] + JSON.stringify(JSON.parse(matches[2])) + matches[3] : input;
  }
}

/** The actual script */
if (!args.in || !args.out) {
  throw new Error('Usage: node build_minify.js (--in|-i) <input> (--out|-o) <output>');
}

new Builder().minify(args.in, args.out);
