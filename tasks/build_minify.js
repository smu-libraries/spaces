/**
 * @file Minifies/uglifies the pages and images.
 */

let path = require('path');
let fse = require('fs-extra');
let minify = require('html-minifier').minify;

class Builder {
  minify(input_folder, output_folder) {
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
        default:
          fse.copySync(input_path, output_path);
          break;
      }
    }, this);
    return this;
  }

  minifyHtml(input) {
    return minify(input, {
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
      removeComments: true
    });
  }

  minifyLdJson(input) {
    let matches = /(^[^]*<script type="application\/ld\+json">)([^]*)(<\/script>[^]*$)/.exec(input);
    return matches ? matches[1] + JSON.stringify(JSON.parse(matches[2])) + matches[3] : input;
  }

  minifyRaster(input) {}

  minifySvg(input) {}
}

new Builder().minify('out_hogan', 'public');
