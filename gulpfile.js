var gulp = require('gulp');
var childProcess = require('child_process');

var applicationProcess = null;

/**
 * var watchPaths = ['render.js'];
*/

var watchPaths = ['tests/*.js'];
var childFork = 'render.js';

gulp.task('run', function (){
  applicationProcess = childProcess.fork(watchPaths);
});

gulp.task('kill', function (){

  if (applicationProcess) {
    applicationProcess.kill();
  }
});

gulp.task('reload', ['kill', 'run']);

gulp.task('watch', function (){
  gulp.watch(watchPaths, ['reload']);
});

gulp.task('default', ['run', 'watch']);