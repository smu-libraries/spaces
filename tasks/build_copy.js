let fse = require('fs-extra');

fse.ensureDirSync('public');
fse.copySync('images', 'public/images')
