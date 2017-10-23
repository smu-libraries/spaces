let browser_sync = require('browser-sync').create();
let del = require('del');
let gh_pages = require('gh-pages');
let gulp = require('gulp');
let gulp_amphtml_validator = require('gulp-amphtml-validator');
let htmlmin = require('gulp-htmlmin');
let imagemin = require('gulp-imagemin');
let json_minify = require('gulp-json-minify');
let less = require('gulp-less');
let util = require('gulp-util');
let path = require('path');
let sw_precache = require ('sw-precache');

let minify_embedded_json = require('./tasks/gulp_minify_embedded_json');
let HoganBuilder = require('./tasks/HoganBuilder');

gulp.task('clean', () => {
  return del([
    'html/**/*',
    'public/**/*',
    'styles/**/*'
  ]);
});

gulp.task('less', () => {
  return gulp.src('less/*.less')
    .pipe(less({ paths: [path.join(__dirname, 'less')] }))
    .pipe(gulp.dest('styles'));
});

function hogan(injected_context = {}) {
  return new HoganBuilder(injected_context)
    .addTemplates('styles', ['.css'])
    .addTemplates('schema', ['.json'])
    .addTemplates('templates/partials', ['.mustache'])
    .renderPages('templates', 'html');
}
gulp.task('hogan_dev', gulp.series('less', function _hogan_dev(done) {
  hogan({ release: false });
  done();
}));
gulp.task('hogan', gulp.series('less', function _hogan(done) {
  hogan({ release: true });
  done();
}));

gulp.task('minify_html_dev', gulp.series('hogan_dev', function _minify_html_dev() {
  return gulp.src('html/*.html')
    .pipe(gulp.dest('public'));
}));
gulp.task('minify_html', gulp.series('hogan', function _minify_html() {
  return gulp.src('html/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
      removeComments: true
    }))
    .pipe(minify_embedded_json())
    .pipe(gulp.dest('public'));
}));

gulp.task('minify_images', () => {
  return gulp.src('images/*.{jpg,png,svg}')
    .pipe(imagemin())
    .pipe(gulp.dest('public/images'));
});

gulp.task('minify_json', () => {
  return gulp.src('static/*.json')
    .pipe(json_minify())
    .pipe(gulp.dest('public'));
});

gulp.task('minify_dev', gulp.parallel('minify_html_dev', 'minify_images', 'minify_json'));
gulp.task('minify', gulp.parallel('minify_html', 'minify_images', 'minify_json'));

function precache(handleFetch = true) {
  return sw_precache.write(path.join(__dirname, 'public', 'service_worker.js'), {
    cacheId: 'spaces',
    handleFetch: handleFetch,
    staticFileGlobs: ['public/**/*'],
    stripPrefix: 'public/'
  }, (error) => {
    if (error) throw new util.PluginError(error);
  });
}
gulp.task('precache_dev', () => {
  return precache(false);
});
gulp.task('precache', () => {
  return precache(true);
});

gulp.task('copy_no_precache', () => {
  return gulp.src('static/web.config')
    .pipe(gulp.dest('public'));
});

function browsersync_reload(done) {
  browser_sync.reload();
  done();
}
gulp.task('watch', gulp.series('minify_dev', 'precache_dev', 'copy_no_precache', function _watch(done) {
  gulp.watch('less/*.less', gulp.series('minify_html_dev', 'precache_dev', browsersync_reload));
  gulp.watch(['templates/**/*.mustache', 'templates/contexts.json'], gulp.series('minify_html_dev', 'precache_dev', browsersync_reload));
  gulp.watch('images/*.{jpg,png,svg}', gulp.series('minify_images', 'precache_dev', browsersync_reload));
  gulp.watch('static/*.json', gulp.series('minify_json', 'precache_dev', browsersync_reload));
  done();
}));

gulp.task('browsersync', gulp.series('watch', function _browsersync(done) {
  browser_sync.init({ server: { baseDir: 'public' }}, done);
}));

gulp.task('validate', () => {
  return gulp.src('public/*.html')
    .pipe(gulp_amphtml_validator.validate())
    .pipe(gulp_amphtml_validator.format())
    .pipe(gulp_amphtml_validator.failAfterError());
});

gulp.task('dev', gulp.series('clean', 'browsersync'));

gulp.task('rel', gulp.series('clean', 'minify', 'precache', 'copy_no_precache', 'validate'));

gulp.task('publish', gulp.series('rel', function _publish(done) {
  gh_pages.publish('public', (error) => {
    if (error) throw new util.PluginError(error);
    done();
  });
}));

gulp.task('default', gulp.series('rel'));
