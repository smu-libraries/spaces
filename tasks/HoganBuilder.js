/**
 * @file Compiles and renders the templates in the given folder using Hogan.js.
 *
 * There is no error checking -- script fails at the first error. Stick to lowercase file names and extensions. Use UTF-8 file encoding.
 */

let path = require('path');
let fse = require('fs-extra');
let Hogan = require('hogan.js');

/**
 * Represents the builder that collects templates and perform the rendering.
 */
class HoganBuilder {
  /**
   * Creates a HoganBuilder.
   *
   * @param {object} injected_tags - The common tags and values that will be injected into all the contexts.
   */
  constructor(injected_tags) {
    /**
     * @property {object} injected_tags - The common tags and values that will be injected into all the contexts.
     */
    this.injected_tags = injected_tags || {};

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
   * Renders the templates in the given folder and output to the chosen destination. This method is usually called as the final step, after adding all the necessary partials using {@link addTemplates}. This function expects the templates to have the file extension ".mustache". All the output files will be saved with the file extension ".html". Any context data to be rendered must be inside a file named "contexts.json" in the input folder -- use the template name as the key to refer to the context data for that template. A context can include additional contexts from other templates, by using an "includes" array to list all the templates to be included. Watch out for circular dependencies!
   *
   * @param {string} input_folder - The folder to check for mustache templates. The search is not recursive.
   * @param {string} output_folder - The folder to save the rendered HTML files.
   */
  renderPages(input_folder, output_folder) {
    /** Add the input folder itself to our collection of templates */
    this.addTemplates(input_folder, ['.mustache']);

    /** Check the output folder */
    fse.ensureDirSync(output_folder);

    /** Retrieve the context data if available */
    let contexts = {};
    let contexts_path = path.join(input_folder, 'contexts.json');
    if (fse.existsSync(contexts_path)) {
      contexts = JSON.parse(fse.readFileSync(contexts_path));
    }

    /** Add injected tags into context */
    Object.keys(contexts).forEach((template) => {
      let combined_context = contexts[template];
      Object.assign(combined_context, this.injected_tags);
      contexts[template] = combined_context;
    });

    /** Merge in context for partials if requested */
    /** TODO: Pull partials from the template directly rather than having to explicitly do an include */
    Object.keys(contexts).forEach((template) => {
      if ('includes' in contexts[template]) {
        let merged_context = contexts[template];
        contexts[template]['includes'].forEach((include) => {
          Object.assign(merged_context, contexts[include]);
        });
        contexts[template] = merged_context;
      }
    });

    /** Generate page numbers. This works with a "slides" array, where a generated "pager" tag (showing the page number) will be inserted into each element */
    let generate_pager = (page_number, page_count) => {
      let pages_before = '○'.repeat(page_number - 1);
      let pages_after = '○'.repeat(page_count - page_number);
      return `${pages_before}●${pages_after}`;
    };
    Object.keys(contexts).forEach((template) => {
      if ('slides' in contexts[template]) {
        contexts[template]['slides'].forEach((slide, index) => {
          slide.pager = generate_pager(index + 1, contexts[template]['slides'].length);
        });
      }
    });

    fse.readdirSync(input_folder).forEach((file) => {
      if (path.extname(file) === '.mustache') {  /** only do mustache files */
        let output_path = path.join(output_folder, file).replace(/\.mustache$/, '.html');
        let input_path = path.join(input_folder, file).replace(/\\/g, '/');  /** the replacement is necessary because we use / as path delimiter */
        let context = input_path in contexts ? contexts[input_path] : {};
        let rendered_output = this.templates[input_path].render(context, this.templates);
        fse.writeFileSync(output_path, rendered_output);
      }
    }, this);
    return this;
  }
}

module.exports = HoganBuilder;
