// SPOLLERS
export function spollers() {
   const spollersArray = document.querySelectorAll('[data-spollers]');
   if (spollersArray.length > 0) {
      // Получение обычных слойлеров у которых нет параметров в атрибуте data-spollers
      const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
         return !item.dataset.spollers.split(",")[0];
      });
      // Инициализация обычных слойлеров
      if (spollersRegular.length > 0) {
         initSpollers(spollersRegular);
      }

      // Получение слойлеров с медиа запросами у которых есть параметры в атрибуте data-spollers
      const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
         return item.dataset.spollers.split(",")[0];
      });

      // Инициализация слойлеров с медиа запросами
      if (spollersMedia.length > 0) {
         const breakpointsArray = [];
         // перебираем массив спойдеров с медиа запросами
         spollersMedia.forEach(item => {
            // получаем параметры data-spollers в виде строки
            const params = item.dataset.spollers;
            // создаем обьект в котором будут поля данные спойдера
            const breakpoint = {};
            // из наших параметров делаем массив , где размер нашего брейкоинта будет [0] , а тип min / max будет [1] 
            const paramsArray = params.split(",");
            breakpoint.value = paramsArray[0];
            breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
            breakpoint.item = item;
            // пушим наши обьекты в массив,и теперь наши обьекты имеют поля с данными
            breakpointsArray.push(breakpoint);
         });

         // Получаем уникальные брейкпоинты:
         // Бывают случаи когда у нас условия брейкоинтов совпадают,по этому создаем массив с уникальными брейкпоинтами чтоб учесть повторения  
         // Пример : (min-width: 650px),650,min
         let mediaQueries = breakpointsArray.map(function (item) {
            return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
         });
         // далее фильтруем и будут у нас уникальные значения без повторов
         mediaQueries = mediaQueries.filter(function (item, index, self) {
            return self.indexOf(item) === index;

         });

         // Работаем с каждым брейкпоинтом
         mediaQueries.forEach(breakpoint => {
            const paramsArray = breakpoint.split(",");
            const mediaBreakpoint = paramsArray[1];
            const mediaType = paramsArray[2];
            const matchMedia = window.matchMedia(paramsArray[0]);

            // Объекты с нужными условиями, тоесть собираем массив обьектов кторые соотвествуют данному брейкпоинту
            const spollersArray = breakpointsArray.filter(function (item) {
               if (item.value === mediaBreakpoint && item.type === mediaType) {
                  return true;
               }
            });
            // Событие
            matchMedia.addListener(function () {
               initSpollers(spollersArray, matchMedia);
            });
            initSpollers(spollersArray, matchMedia);
         });
      }
      // Инициализация
      function initSpollers(spollersArray, matchMedia = false) {
         spollersArray.forEach(spollersBlock => {
            spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
            if (matchMedia.matches || !matchMedia) {
               // по этому классу выводим все атрибуты спойлера тоесть иконку закрытия открытия справа вверху заголовка
               spollersBlock.classList.add('_init');
               // данная функция работает с контентной частью спойлера
               initSpollerBody(spollersBlock);
               spollersBlock.addEventListener("click", setSpollerAction);
            } else {
               spollersBlock.classList.remove('_init');
               initSpollerBody(spollersBlock, false);
               spollersBlock.removeEventListener("click", setSpollerAction);
            }
         });
      }
      // Работа с контентом
      function initSpollerBody(spollersBlock, hideSpollerBody = true) {
         // получаем все заголовки конкретного блока
         const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
         if (spollerTitles.length > 0) {
            spollerTitles.forEach(spollerTitle => {
               if (hideSpollerBody) {
                  spollerTitle.removeAttribute('tabindex');
                  // если у нашего заголовка нету класса _active тогда скрываем контентрую часть  
                  if (!spollerTitle.classList.contains('_active')) {
                     spollerTitle.nextElementSibling.hidden = true;
                  }
               } else {
                  spollerTitle.setAttribute('tabindex', '-1');
                  spollerTitle.nextElementSibling.hidden = false;
               }
            });
         }
      }
      // данная ф-ция выполняется когда мы кликаем на заголовок
      function setSpollerAction(e) {
         const el = e.target;
         // воторая проверка "||" надо для тех случаев если внутрь нашего заголовка можем добавить какойто тег типа span для стилизации
         if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
            const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
            const spollersBlock = spollerTitle.closest('[data-spollers]');
            // далее для функционала если нам надо сделать аккардион а не спойлер
            const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
            if (!spollersBlock.querySelectorAll('._slide').length) {
               if (oneSpoller && !spollerTitle.classList.contains('_active')) {
                  hideSpollersBody(spollersBlock);
               }
               spollerTitle.classList.toggle('_active');
               _slideToggle(spollerTitle.nextElementSibling, 500);
            }
            e.preventDefault();
         }
      }
      function hideSpollersBody(spollersBlock) {
         const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');
         if (spollerActiveTitle) {
            spollerActiveTitle.classList.remove('_active');
            _slideUp(spollerActiveTitle.nextElementSibling, 500);
         }
      }
   }
}

//========================================================================================================================================================
//SlideToggle
export let _slideUp = (target, duration = 500) => {
   if (!target.classList.contains('_slide')) {
      target.classList.add('_slide');
      target.style.transitionProperty = 'height, margin, padding';
      target.style.transitionDuration = duration + 'ms';
      target.style.height = target.offsetHeight + 'px';
      target.offsetHeight;
      target.style.overflow = 'hidden';
      target.style.height = 0;
      target.style.paddingTop = 0;
      target.style.paddingBottom = 0;
      target.style.marginTop = 0;
      target.style.marginBottom = 0;
      window.setTimeout(() => {
         target.hidden = true;
         target.style.removeProperty('height');
         target.style.removeProperty('padding-top');
         target.style.removeProperty('padding-bottom');
         target.style.removeProperty('margin-top');
         target.style.removeProperty('margin-bottom');
         target.style.removeProperty('overflow');
         target.style.removeProperty('transition-duration');
         target.style.removeProperty('transition-property');
         target.classList.remove('_slide');
      }, duration);
   }
}
export let _slideDown = (target, duration = 500) => {
   if (!target.classList.contains('_slide')) {
      target.classList.add('_slide');
      if (target.hidden) {
         target.hidden = false;
      }
      let height = target.offsetHeight;
      target.style.overflow = 'hidden';
      target.style.height = 0;
      target.style.paddingTop = 0;
      target.style.paddingBottom = 0;
      target.style.marginTop = 0;
      target.style.marginBottom = 0;
      target.offsetHeight;
      target.style.transitionProperty = "height, margin, padding";
      target.style.transitionDuration = duration + 'ms';
      target.style.height = height + 'px';
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      window.setTimeout(() => {
         target.style.removeProperty('height');
         target.style.removeProperty('overflow');
         target.style.removeProperty('transition-duration');
         target.style.removeProperty('transition-property');
         target.classList.remove('_slide');
      }, duration);
   }
}
let _slideToggle = (target, duration = 500) => {
   if (target.hidden) {
      return _slideDown(target, duration);
   } else {
      return _slideUp(target, duration);
   }
}

//========================================================================================================================================================
/*
Для родителя слойлеров пишем атрибут data-spollers
Для заголовков слойлеров пишем атрибут data-spoller
Если нужно включать\выключать работу спойлеров на разных размерах экранов
пишем параметры ширины и типа брейкпоинта.
Например:
data-spollers="992,max" - спойлеры будут работать только на экранах меньше или равно 992px
data-spollers="768,min" - спойлеры будут работать только на экранах больше или равно 768px

Если нужно что бы в блоке открывался болько один слойлер добавляем атрибут data-one-spoller
*/

/*
<body>
   <div class="wrapper">
      <div data-spollers class="block block_1">
         <div class="block__item">
            <button tabindex="-1" type="button" data-spoller class="block__title _active"><span>Обычный спойлер №1</span></button>
            <div class="block__text">
               Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas hic numquam magni. Nulla, laborum illo
               enim qui eum architecto soluta, quos provident natus nobis a et aspernatur, labore fuga aliquam!
            </div>
         </div>
         <div class="block__item">
            <button tabindex="-1" type="button" data-spoller class="block__title">Обычный спойлер №2</button>
            <div class="block__text">
               Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas hic numquam magni. Nulla, laborum illo
               enim qui eum architecto soluta, quos provident natus nobis a et aspernatur, labore fuga aliquam!
            </div>
         </div>
         <div class="block__item">
            <button tabindex="-1" type="button" data-spoller class="block__title">Обычный спойлер №3</button>
            <div class="block__text">
               Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas hic numquam magni. Nulla, laborum illo
               enim qui eum architecto soluta, quos provident natus nobis a et aspernatur, labore fuga aliquam!
            </div>
         </div>
      </div>
      <div data-spollers="650,min" class="block block_2">
         <div class="block__item">
            <button tabindex="-1" type="button" data-spoller class="block__title">Спойлер работает на экранах >=650px</button>
            <div class="block__text">
               Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas hic numquam magni. Nulla, laborum illo
               enim qui eum architecto soluta, quos provident natus nobis a et aspernatur, labore fuga aliquam!
            </div>
         </div>
      </div>
      <div data-spollers="800,max" class="block block_3">
         <div class="block__item">
            <button tabindex="-1" type="button" data-spoller class="block__title">Спойлер #1 работает на экранах <=800px</button>
                  <div class="block__text">
                     Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas hic numquam magni. Nulla,
                     laborum illo enim qui eum architecto soluta, quos provident natus nobis a et aspernatur, labore
                     fuga aliquam!
                  </div>
         </div>
         <div class="block__item">
            <button tabindex="-1" type="button" data-spoller class="block__title">Спойлер #2 работает на экранах <=800px</button>
                  <div class="block__text">
                     Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas hic numquam magni. Nulla,
                     laborum illo enim qui eum architecto soluta, quos provident natus nobis a et aspernatur, labore
                     fuga aliquam!
                  </div>
         </div>
      </div>
   </div>
   <script src="js/script.js"></script>
</body>
*/