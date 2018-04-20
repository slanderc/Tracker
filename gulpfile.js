var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    url = require("url"),
    fs = require("fs")
  
gulp.task('dev', function () {
  function updateHtml() {
    browserSync.reload();
  }

  browserSync.init({
    server: {
      baseDir: "./src"
    },
    port: 8080
  });

  gulp.watch("./src/*").on('change', updateHtml);
  gulp.watch("./src/js/*").on('change', updateHtml);
  gulp.watch("./src/css/*").on('change', updateHtml);
});