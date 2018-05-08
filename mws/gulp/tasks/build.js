var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var del = require('del');
var usemin = require('gulp-usemin');
var rev = require('gulp-rev');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();

gulp.task('previewDist', function(){
  browserSync.init({
    notify:false,
    server:{
      baseDir: "dist"
    }
  });
});

gulp.task('deleteDistFolder',['icons'], function(){
  return del('./dist');
});

gulp.task('copyGeneralFiles',['deleteDistFolder'],function(){
  var pathsToCopy =['./public/**/*',
                    '!./public/assets/images/**',
                    '!./public/assets/styles/**',
                    '!./public/temp',
                    '!./public/temp/**'
                  ]
    return gulp.src(pathsToCopy)
              .pipe(gulp.dest('./dist'));
});

gulp.task('optimizeImages',['deleteDistFolder'],function(){
  return gulp.src(['./public/assets/images/**/*','!./public/assets/images/icons','!./public/assets/images/icons/**/*'])
              .pipe(imagemin({
                progressive: true,
                interlaced: true,
                multipass: true
              }))
              .pipe(gulp.dest('./dist/assets/images'));
});
gulp.task('useminTrigger',['deleteDistFolder'], function(){
  gulp.start('usemin');
});

gulp.task('usemin',['styles','scripts'], function(){
  return gulp.src('../../views/index.ejs')
              .pipe(usemin({
                css:[function(){return rev()}, function(){return cssnano()}],
                js:[function(){return rev()}, function(){return uglify()}]
              }))
              .pipe(gulp.dest('./dist'));
});
