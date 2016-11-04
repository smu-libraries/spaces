/**
 * @file Validates the HTML files for compliance to AMP.
 *
 * Usage: node validate.js (--input|-i) <folder>
 *
 * There is no error checking -- script fails at the first error. Stick to lowercase file names and extensions. Use UTF-8 file encoding.
 */

let path = require('path');
var amphtmlValidator = require('amphtml-validator');
let command_line_args = require('command-line-args');
let fse = require('fs-extra');

let args = command_line_args([
  {
    name: 'input',
    alias: 'i',
    type: String
  }
]);

if (!args.input) {
  throw new Error('Usage: node validate.js (--input|-i) <folder>');
}

amphtmlValidator.getInstance().then(function (validator) {
  fse.readdirSync(args.input).forEach((file) => {
    if (path.extname(file) === '.html') {  /** only process HTML files */
      let input_path = path.join(args.input, file);
      let content = fse.readFileSync(input_path, 'utf8');
      var result = validator.validateString(content);
      ((result.status === 'PASS') ? console.log : console.error)(result.status);
      for (var ii = 0; ii < result.errors.length; ii++) {
        var error = result.errors[ii];
        var msg = 'file ' + file + ': line ' + error.line + ', col ' + error.col + ': ' + error.message;
        if (error.specUrl !== null) {
          msg += ' (see ' + error.specUrl + ')';
        }
        ((error.severity === 'ERROR') ? console.error : console.warn)(msg);
      }
    }
  });
});
