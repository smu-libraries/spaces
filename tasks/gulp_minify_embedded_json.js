/**
 * @file Minifies any embedded JSON script sections in a HTML file.
 */

let util = require('gulp-util');
let through = require('through2');

const PLUGIN_NAME = 'gulp_minify_embedded_json';

/**
 * Minifies any embedded JSON script sections in a HTML file.
 */
function gulp_minify_embedded_json() {
  /**
   * Minifies the given JSON string by removing any whitespace.
   * @param json {string} - The JSON string to process.
   * @returns The minified JSON string.
   */
  function minify_json(json) {
    return JSON.stringify(JSON.parse(json));
  }

  /**
   * Minifies the embedded JSON script sections inside the given HTML string.
   * @param html {string} - The HTML string to process.
   * @returns The HTML string with all embedded JSON minified.
   */
  function minify_embedded_json(html) {
    return html.replace(/(<script type="application\/(ld\+)?json">)([^]*?)(<\/script>)/g, ((m0, m1, m2, m3, m4) => {
      return m1 + minify_json(m3) + m4;
    }));
  }

  return through.obj((file, encoding, callback) => {
    if (file.isNull()) {
      return callback(null, file);
    }

    if (file.isStream()) {
      throw new util.PluginError(PLUGIN_NAME, 'Streams are not supported');
    }

    if (file.isBuffer()) {
      file.contents = Buffer.from(minify_embedded_json(file.contents.toString(encoding)), encoding);
      return callback(null, file);
    }
  });
}

module.exports = gulp_minify_embedded_json;
