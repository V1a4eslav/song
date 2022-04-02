// основной модуль
import gulp from 'gulp';

//  импорт путей
import { path } from './gulp/config/path.js';

// испорт общих плагинов
import { plugins } from './gulp/config/plugins.js';

// передаем значение в глобальную переменную 
global.app = {
   isBuild: process.argv.includes('--build'),
   isDev: !process.argv.includes('--build'),
   path: path,
   gulp: gulp,
   plugins: plugins
}

// импорт задач
import { copy } from './gulp/tasks/copy.js';
import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html.js';
import { server } from './gulp/tasks/server.js';
import { scss } from './gulp/tasks/scss.js';
import { js } from './gulp/tasks/js.js';
import { images } from './gulp/tasks/images.js';
import { otfToTtf, ttfToWoff, fontsStyle } from './gulp/tasks/fonts.js';

// наблюдаем за изменениями файлов
function watcher() {
   gulp.watch(path.watch.files, copy); // указываем путь к файлам за которыми надо следить и дейстивие которое надо выполнить
   gulp.watch(path.watch.html, html);
   gulp.watch(path.watch.scss, scss);
   gulp.watch(path.watch.js, js);
   gulp.watch(path.watch.images, images);
}

// Последобавляемая обработка шрифтов
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

//основныe задачи
const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images));

// построение сценариев выполнения задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);

// Экспорт сценариев
export { dev }
export { build }

// выполнение сценария по умолчанию
gulp.task('default', dev);