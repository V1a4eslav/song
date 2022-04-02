// в папке config будут хранится файлы настроек
// в данном файле будут хранится пути 

import * as nodePath from 'path'; // импортируем модуль path
const rootFolder = nodePath.basename(nodePath.resolve()); // c помощью модуля получаем в константу имя папки проекта

const buildFolder = './dist'; // содержит путь к папке результата
const srcFolder = './src'; // содержит путь к папке исходников

export const path = { //тут будет хрантся вся информация о пути к тому или инному файлу. Экспортируем чтоб мы моглииспользовать пути котрые прописали в обьекте
   build: {
      js: `${buildFolder}/js/`,
      css: `${buildFolder}/css/`,
      html: `${buildFolder}/`,
      images: `${buildFolder}/img/`,
      fonts: `${buildFolder}/fonts/`,
      files: `${buildFolder}/files/`,
   },
   src: {
      js: `${srcFolder}/js/app.js`,
      images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
      svg: `${srcFolder}/img/**/*.svg`,
      scss: `${srcFolder}/scss/style.scss`,
      html: `${srcFolder}/*.html`,
      files: `${srcFolder}/files/**/*.*`,
   },
   watch: {
      js: `${srcFolder}/js/**/*.js`,
      scss: `${srcFolder}/scss/**/*.scss`,
      html: `${srcFolder}/**/*.html`,
      images: `${srcFolder}/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}`,
      files: `${srcFolder}/files/**/*.*`,
   },
   clean: buildFolder,
   buildFolder: buildFolder,
   srcFolder: srcFolder,
   rootFolder: rootFolder,
   ftp: ``
} 
