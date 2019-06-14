/* eslint no-console: 0, arrow-body-style: 0 */

const gulp = require('gulp');
const babel = require('gulp-babel');
const clean = require('gulp-clean');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const runSequence = require('run-sequence');
const gulpIstanbul = require('gulp-istanbul');
const isparta = require('isparta');
const sourcemaps = require('gulp-sourcemaps');
const gulpWebpack = require('webpack-stream');
const webpackConfig = require('./webpack.config');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

gulp.task('clean', () => {
  return gulp
    .src(['lib', 'dist', 'coverage', 'upload'], { read: false })
    .pipe(clean());
});

gulp.task('babel', () => {
  return gulp
    .src('src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('lib'));
});

gulp.task('lint_code', [], () => {
  return gulp
    .src(['src/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('lint_tests', [], () => {
  return gulp
    .src(['test/**/*.js', '!test/dist/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('lint', ['lint_code', 'lint_tests']);

gulp.task('test_client', () => {
  return gulp
    .src(['test/react/*.js'], { read: false })
    .pipe(mocha({ reporter: 'spec', exit: true }))
    .pipe(gulpIstanbul.writeReports({ reporters: ['json', 'lcov', 'text'] }))
    .once('error', err => {
      console.error(err);
      process.exit(1);
    })
    .once('end', () => {
      process.exit();
    });
});

gulp.task('compile_web', () => {
  return gulp
    .src('src/pubnub-react.js')
    .pipe(gulpWebpack(webpackConfig))
    .pipe(gulp.dest('dist'));
});

gulp.task('pre-test', () => {
  return gulp
    .src(['src/**/*.js'])
    .pipe(
      gulpIstanbul({
        instrumenter: isparta.Instrumenter,
        includeAllSources: true,
      })
    )
    .pipe(gulpIstanbul.hookRequire());
});

gulp.task('uglify_web', () => {
  return gulp
    .src('dist/pubnub-react.js')
    .pipe(uglify({ mangle: true, compress: true }))

    .pipe(rename('pubnub-react.min.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('test', done => {
  runSequence('pre-test', 'test_client', 'lint', done);
});

gulp.task('compile', done => {
  runSequence('clean', 'babel', 'compile_web', 'uglify_web', done);
});
