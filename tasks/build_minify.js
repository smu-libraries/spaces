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
          let html_content = fse.readFileSync(input_path, 'utf8');
          html_content = this.minifyHtml(html_content);
          html_content = this.minifyEmbeddedJson(html_content);
          fse.writeFileSync(output_path, html_content);
          break;
        case '.json':
          let json_content = fse.readFileSync(input_path, 'utf8');
          json_content = this.minifyJson(json_content);
          fse.writeFileSync(output_path, json_content);
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
   * Minifies a HTML string with an embedded JSON script by removing the whitespace in the JSON data.
   *
   * @param input {string} - The HTML string to minify.
   */
  minifyEmbeddedJson(input) {
    return input.replace(/(<script type="application\/(ld\+)?json">)([^]*?)(<\/script>)/g, ((m0, m1, m2, m3, m4) => {
      return m1 + this.minifyJson(m3) + m4;
    }).bind(this));
  }

  /**
   * Minifies a JSON string by removing the whitespace.
   *
   * @param input {string} - The JSON string to minify.
   */
  minifyJson(input) {
    return JSON.stringify(JSON.parse(input));
  }
}

/** The actual script */
if (!args.in || !args.out) {
  throw new Error('Usage: node build_minify.js (--in|-i) <input> (--out|-o) <output>');
}

new Builder().minify(args.in, args.out);
