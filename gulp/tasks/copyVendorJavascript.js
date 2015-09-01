'use strict';

var gulp   = require('gulp');
var config = require('../config');

gulp.task('copyVendor', function() {

  gulp.src(config.sourceDir + 'js/**/react*.js').pipe(gulp.dest(config.buildDir + 'js/'));

});
