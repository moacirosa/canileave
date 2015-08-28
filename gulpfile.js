var gulp = require('gulp');
var childProcess = require('child_process');

var applicationProcess = null;

/**
 * var watchPaths = ['render.js'];
*/

var watchPaths = ['leave.js'];
var childFork = 'leave.js';

gulp.task('run', function (){
  applicationProcess = childProcess.fork(childFork);
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