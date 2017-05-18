const gulp = require('gulp');
const path = require('path');
const babel = require('gulp-babel');
const clean = require('gulp-clean');
const gulpWebpack = require('webpack-stream');
const webpackConfig = require('./webpack.config');
const eslint = require('gulp-eslint');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const exec = require('child_process').exec;
const Karma = require('karma').Server;
const mocha = require('gulp-mocha');
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

gulp.task('compile_web', () => {
  return gulp.src('src/react/index.js')
    .pipe(gulpWebpack(webpackConfig))
    .pipe(gulp.dest('dist/web'));
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

gulp.task('uglify_web', () => {
  return gulp.src('dist/web/pubnub.js')
    .pipe(uglify({ mangle: true, compress: true }))

    .pipe(rename('pubnub.min.js'))
    .pipe(gulp.dest('dist/web'))

    .pipe(rename(`pubnub.${packageJSON.version}.min.js`))
    .pipe(gulp.dest('upload/normal'));
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

gulp.task('test_release', () => {
  return gulp.src('test/release/**/*.test.js', { read: false })
    .pipe(mocha({ reporter: 'spec' }));
});

gulp.task('test', (done) => {
  runSequence('pre-test', 'test_node', 'test_web', 'test_titanium', 'test_release', 'validate', done);
});

gulp.task('webpack', (done) => {
  runSequence('compile_web', 'compile_titanium', done);
});

gulp.task('compile', (done) => {
  runSequence('clean', 'babel', 'webpack', 'uglify_web', 'uglify_titanium', 'create_version', 'create_version_gzip', done);
});