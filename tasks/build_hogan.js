/**
 * @file Compiles and renders the pages using Hogan.js.
 */

let path = require('path');
let fse = require('fs-extra');
let Hogan = require('hogan.js');

class Builder {
  constructor() {
    this.templates = {};
  }

  addTemplates(input_folder, file_extensions) {
    fse.readdirSync(input_folder).forEach((file) => {
      if (file_extensions.includes(path.extname(file))) {
        let template_path = path.join(input_folder, file);
        let template_content = fse.readFileSync(template_path, 'utf8');
        let compiled_template = Hogan.compile(template_content);
        template_path = template_path.replace(/\\/g, '/');
        this.templates[template_path] = compiled_template;
      }
    }, this);
    return this;
  }

  renderPages(input_folder, output_folder) {
    this.addTemplates(input_folder, ['.mustache']);
    fse.ensureDirSync(output_folder);
    fse.readdirSync(input_folder).forEach((file) => {
      if (path.extname(file) === '.mustache') {
        let output_path = path.join(output_folder, file).replace(/\.mustache$/, '.html');
        let input_path = path.join(input_folder, file).replace(/\\/g, '/');
        let rendered_output = this.templates[input_path].render({}, this.templates);
        fse.writeFileSync(output_path, rendered_output);
      }
    }, this);
    return this;
  }
}

new Builder()
  .addTemplates('schema', ['.json'])
  .addTemplates('styles', ['.css'])
  .addTemplates('templates/partials', ['.mustache'])
  .renderPages('templates', 'out_hogan');
