let path = require('path');
var amphtmlValidator = require('amphtml-validator');
let fse = require('fs-extra');

amphtmlValidator.getInstance().then(function (validator) {
  fse.readdirSync('public').forEach((file) => {
    if (path.extname(file) === '.html') {
      let input_path = path.join('public', file);
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
