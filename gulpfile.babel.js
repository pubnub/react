const gulp = require('gulp');
const path = require('path');
const babel = require('gulp-babel');
const clean = require('gulp-clean');
const eslint = require('gulp-eslint');
const rename = require('gulp-rename');
const mocha = require('gulp-mocha');
const plug = require('gulp-load-plugins')({ lazy: true });
const runSequence = require('run-sequence');
const gulpIstanbul = require('gulp-istanbul');
const isparta = require('isparta');
const sourcemaps = require('gulp-sourcemaps');
const packageJSON = require('./package.json');

gulp.task('clean', () => {
  return gulp.src(['lib', 'dist', 'coverage', 'upload'], { read: false })
    .pipe(clean());
});

gulp.task('babel', () => {
  return gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('lib'));
});

gulp.task('create_version', () => {
  return gulp.src('dist/web/pubnub.js')
    .pipe(rename(`pubnub.${packageJSON.version}.js`))
    .pipe(gulp.dest('upload/normal'));
});

gulp.task('create_version_gzip', () => {
  return gulp.src('upload/normal/*.js')
    .pipe(gzip({ append: false }))
    .pipe(gulp.dest('upload/gzip'));
});

gulp.task('lint_code', [], () => {
  return gulp.src(['src/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('lint_tests', [], () => {
  return gulp.src(['test/**/*.js', '!test/dist/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('lint', ['lint_code', 'lint_tests']);

gulp.task('test_client', function () {
  return gulp.src('./test/**/*.js', { read: false })
    .pipe(plug.mocha({
      compilers: {
        js: babel
      }
    }));
});

gulp.task('test_release', () => {
  return gulp.src('test/release/**/*.test.js', { read: false })
    .pipe(mocha({ reporter: 'spec' }));
});

gulp.task('pre-test', () => {
  return gulp.src(['src/**/*.js'])
    .pipe(gulpIstanbul({ instrumenter: isparta.Instrumenter, includeAllSources: true }))
    .pipe(gulpIstanbul.hookRequire());
});

gulp.task('test', (done) => {
  runSequence('pre-test', 'test_client', 'test_release', 'lint', done);
});

gulp.task('compile', (done) => {
  runSequence('clean', 'babel', 'compile_web', 'uglify_web', 'create_version', 'create_version_gzip', done);
});