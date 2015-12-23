# gulp.header

add header with data

## Install

    $ npm install gulp.header --save-dev

## How to use

### general

    var data       = require('gulp-data');
    var header     = require('gulp.header');

    // > 'Hello, bar'
    gulp
    .src('src/**/*.js')
    .pipe(header('Hello, {{ foo }}.', {
        foo: 'bar'
    }))

### easy with gulp-data

    var data       = require('gulp-data');
    var header     = require('gulp.header');

    gulp
    .src('src/**/*.js')
    .pipe(data(function (file) {
        return {
            filename: path.basename(file.path),
            dir: path.dirname(file.path)
        };
    }))
    // > 'Hello, bar. << xxx.js'
    .pipe(header('Hello, {{ foo }}. << {{ filename }}', {
        foo: 'bar'
    }))


