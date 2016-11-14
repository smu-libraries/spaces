/**
 * @file Preprocesses the Less files to CSS files in the given folder.
 *
 * Usage: node build_less.js (--in|-i) <input> (--out|-o) <output>
 *
 * There is no error checking -- script fails at the first error. Stick to lowercase file names and extensions. Use UTF-8 file encoding.
 */

let path = require('path');
let command_line_args = require('command-line-args');
let fse = require('fs-extra');
let less = require('less');

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
 * Represents the builder that preprocesses Less to CSS files.
 */
class Builder {
  /**
   * Renders the Less files in the given folder.
   *
   * @param {string} input_folder - The folder to check for Less files.
   * @param {string} output_folder - The folder to saved CSS files to.
   */
  render(input_folder, output_folder) {
    /** Check the output folder */
    fse.ensureDirSync(output_folder);

    fse.readdirSync(input_folder).forEach((file) => {
      let input_path = path.join(input_folder, file);
      let output_path = path.join(output_folder, file).replace(/less$/, 'css');  /** will only work for Less files */
      if (path.extname(file) === '.less') {
        let less_content = fse.readFileSync(input_path, 'utf8');
        less.render(less_content, {
          paths: [input_folder],
          filename: file
        }, (err, rendered_content) => {
          if (err) throw new Error(err);
          fse.writeFileSync(output_path, rendered_content.css);
        });
      }
    }, this);
    return this;
  }
}

/** The actual script */
if (!args.in || !args.out) {
  throw new Error('Usage: node build_less.js (--in|-i) <input> (--out|-o) <output>');
}

new Builder().render(args.in, args.out);
