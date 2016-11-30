/**
 * @file Validates a HTML file against the AMP standard.
 */

let amphtmlValidator = require('amphtml-validator');
let util = require('gulp-util');
let path = require('path');
let through = require('through2');

const PLUGIN_NAME = 'gulp_validate_amphtml';

/**
 * Validates a HTML file against the AMP standard.
 */
function gulp_validate_amphtml() {
  /**
   * Validates the given HTML string against the AMP standard.
   * @param name {string} - A name to associate the given HTML string to. Usually the HTML filename.
   * @param html {string} - The HTML string to validate.
   * @returns There is no return value. Validation result will be written to console. In addition, a failure will result in a gulp-util.PluginError being thrown.
   * @throws {gulp-util.PluginError} The HTML string is not valid AMP.
   */
  function validate_amphtml(name, html) {
    amphtmlValidator.getInstance().then((validator) => {
      var result = validator.validateString(html);
      ((result.status === 'PASS') ? console.log : console.error)(name + ': ' + result.status);
      for (var ii = 0; ii < result.errors.length; ii++) {
        var error = result.errors[ii];
        var msg = 'file ' + name + ': line ' + error.line + ', col ' + error.col + ': ' + error.message;
        if (error.specUrl !== null) {
          msg += ' (see ' + error.specUrl + ')';
        }
        ((error.severity === 'ERROR') ? console.error : console.warn)(msg);
      }

      if (result.status !== 'PASS') {
        throw new util.PluginError(PLUGIN_NAME, 'Validate failed for at least one file');
      }
    });
  }

  return through.obj((file, encoding, callback) => {
    if (file.isNull()) {
      return callback(null, file);
    }

    if (file.isStream()) {
      throw new util.PluginError(PLUGIN_NAME, 'Streams are not supported');
    }

    if (file.isBuffer()) {
      validate_amphtml(path.basename(file.path), file.contents.toString(encoding));
      return callback(null, file);
    }
  });
}

module.exports = gulp_validate_amphtml;
