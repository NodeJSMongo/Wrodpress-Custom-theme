var gulp = require('gulp');
var modernizr = require('gulp-modernizr');


gulp.task('modernizr', function(){
  return gulp.src(['./public/assets/styles/**/*.css','./public/assets/scripts/**/*.js'])
              .pipe(modernizr({
                "options":[
                  "setClasses"
                ]
              }))
              .pipe(gulp.dest('./public/temp/scripts/'));
});
