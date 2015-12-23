var _ = require('lodash');
var gutil = require('gulp-util');
var through = require('through2');

// {{ value }}
_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

module.exports = function (template, data) {
    return through.obj(function (file, enc, cb) {

        if (file.isNull()) {
            this.push(file);
            return cb();
        }

        if (file.data) {
            data = _.merge(file.data, data);
        }

        if (file.isStream()) {
            this.emit('error', new gutil.PluginError('gulp.header', 'Streaming not supported'));
            return cb();
        }

        try {
            var compiled = _.template(template);
            var result = compiled(data);
        } catch(e) {
            console.error('template rendered error.');
            return cb();
        }

        file.contents = Buffer.concat([ new Buffer(result), file.contents ]);
        this.push(file);
        cb();
    });
};
