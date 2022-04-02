export const copy = () => {
   return app.gulp.src(app.path.src.files) // копирование файлов из дериктори
      .pipe(app.gulp.dest(app.path.build.files)) // в путь назначения
}