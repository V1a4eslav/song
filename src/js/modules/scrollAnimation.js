export function scrollAnimation() {
   const animItems = document.querySelectorAll('._anim-items');

   if (animItems.length > 0) {
      window.addEventListener('scroll', animOnScroll);
      function animOnScroll() {
         for (let index = 0; index < animItems.length; index++) {
            const animItem = animItems[index];
            // получаем высоту обьекта
            const animItemHeight = animItem.offsetHeight;
            // позиция обьекта относительно верха
            const animItemOffset = offset(animItem).top;
            // данная переменная это коэфициент , будет регулировать момент старта анимации
            const animStart = 2;
            // Настройка момента старта анимации: высотаОкнаБраузера - высотаОбьекта / коэфициент
            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            // бывают моменты когда анимированый обьект выше по высоте окна браузера и по этому пропишем условие
            if (animItemHeight > window.innerHeight) {
               animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }
            // если мы прокрутили больше чем позиция обьекта - точка старта , но при этом прокрутили меньше чем позиция обьекта + его высота
            if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
               if (animItem.classList.contains('_anim-items')) {
                  animItem.classList.add('active');
               }
            } else {
               if (!animItem.classList.contains('_anim-no-hide')) {
                  animItem.classList.remove('active');
               }
            }
         }
      }
      // ф-ция для коректного получения значение от верха либо слева страницы
      function offset(el) {
         const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
         return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
      }

      setTimeout(() => {
         animOnScroll();
      }, 600);
   }

}