/**
 * @file Compiles and renders the pages using Hogan.js.
 *
 * There is no error checking -- script fails at the first error. Stick to lowercase file names and extensions. Use UTF-8 file encoding.
 */

let path = require('path');
let fse = require('fs-extra');
let Hogan = require('hogan.js');

/**
 * Represents the builder that collects templates and perform the rendering.
 */
class Builder {
  /**
   * Creates a Builder.
   */
  constructor() {
    /**
     * @property {object} templates - The collection of templates, including partials, that will be used for rendering.
     */
    this.templates = {};
  }

  /**
   * Adds the templates in the given folder into the collection.
   *
   * @param {string} input_folder - The folder to check for templates. The search is not recursive.
   * @param {string[]} file_extensions - The array of file extensions (case-sensitive) to add. Any file whose extension is not in this list will be ignored. Include the dot (.) in the extension e.g. ".hjs".
   */
  addTemplates(input_folder, file_extensions) {
    fse.readdirSync(input_folder).forEach((file) => {
      if (file_extensions.includes(path.extname(file))) {
        let template_path = path.join(input_folder, file);
        let template_content = fse.readFileSync(template_path, 'utf8');
        let compiled_template = Hogan.compile(template_content);

        /** Use / as path delimiter when adding the key, even on Windows */
        template_path = template_path.replace(/\\/g, '/');
        this.templates[template_path] = compiled_template;
      }
    }, this);
    return this;
  }

  /**
   * Renders the templates in the given folder and output to the chosen destination. This method is usually called as the final step, after adding all the necessary partials using {@link addTemplates}. This function expects the templates to have the file extension ".mustache". All the output files will be saved with the file extension ".html".
   *
   * @param {string} input_folder - The folder to check for mustache templates. The search is not recursive.
   * @param {string} output_folder - The folder to save the rendered HTML files.
   */
  renderPages(input_folder, output_folder) {
    /** Add the input folder itself to our collection of templates */
    this.addTemplates(input_folder, ['.mustache']);

    /** Check the output folder */
    fse.ensureDirSync(output_folder);

    fse.readdirSync(input_folder).forEach((file) => {
      if (path.extname(file) === '.mustache') {  /** only do mustache files */
        let output_path = path.join(output_folder, file).replace(/\.mustache$/, '.html');
        let input_path = path.join(input_folder, file).replace(/\\/g, '/');  /** the replacement is necessary because we use / as path delimiter */
        let rendered_output = this.templates[input_path].render({}, this.templates);
        fse.writeFileSync(output_path, rendered_output);
      }
    }, this);
    return this;
  }
}

/** The actual script */
new Builder()
  .addTemplates('schema', ['.json'])
  .addTemplates('styles', ['.css'])
  .addTemplates('templates/partials', ['.mustache'])
  .renderPages('templates', 'out_hogan');
