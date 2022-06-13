export class Modal {
   constructor(options) {
      let defaultOptions = {
         isOpen: () => { },
         isClose: () => { },
         // нам необходимо для модалки две анимации,первая для открытия вторая для закрытия
         animation: [],
         speed: 1000,
         focus: false,
         closeble: true,
      }
      this.options = Object.assign(defaultOptions, options);
      // родитель всех модальных окон
      this.modals = document.querySelector('.modals');
      // время окрытия модалки
      this.speed = defaultOptions.speed;
      this.animation = defaultOptions.animation;
      this.closeble = defaultOptions.closeble;
      // невсегда нам надо чтоб был виден фокус по этому создаем якорь
      this.focus = defaultOptions.focus;
      // сама модалка , вместо false буду передавать нужный элемент 
      this.modalContainer = false;
      this.modalOverlay = false;
      this.modalWrapper = false;
      this.previousActiveElement = false;
      // чтоб небыло прыжка ,нужно определить элементы у которых будет абсолют или fixed
      this.fixBlocks = document.querySelectorAll('.fix-block');
      this.focusElements = [
         'a[href]',
         'input',
         'button',
         'select',
         'textarea',
         '[tabindex]'
      ];
      this.events();
   }

   events() {
      if (this.modals) {
         document.addEventListener('click', function (e) {
            const clickedElement = e.target.closest('[data-path]');
            if (clickedElement) {
               e.preventDefault();
               let target = clickedElement.dataset.path;
               this.modalContainer = document.querySelector(`[data-target="${target}"]`);
               if (this.modalContainer) {
                  this.modalOverlay = this.modalContainer.querySelector('.modal__overlay');
                  this.modalWrapper = this.modalOverlay.querySelector('.modal__wrapper');
                  this.open();
                  return;
               }
            }

            if (e.target.closest('.modal__close-btn')) {
               this.close();
               return;
            }
         }.bind(this));

         // обработчик закрытия модалки по ESC
         window.addEventListener('keydown', function (e) {
            if (e.keyCode == 27) {
               if (this.isOpen) {
                  this.close();
               }
            }

            // при нажатии TAB при открытой модалки
            if (e.keyCode == 9 && this.isOpen) {
               this.focusCatch(e);
               return;
            }

         }.bind(this));

         // обработчик закрытия модалки по клику внемодалки
         this.modals.addEventListener('click', function (e) {
            if (!e.target.classList.contains('modal__content') && !e.target.closest('.modal__content') && this.isOpen) {
               this.close();
            }
         }.bind(this));
      }
   }

   open() {
      this.previousActiveElement = document.activeElement;

      // задействуем переменную css '--transition-time' и изменяем ее
      this.modalContainer.style.setProperty('--transition-time', `${this.speed / 1000}s`);
      this.modalContainer.classList.add('open');
      this.disableScroll();

      this.animation.length > 0 ? this.modalWrapper.classList.add(`animate__${this.animation[0]}`, 'animate__animated') : this.modalWrapper.classList.add('animate__animated');

      setTimeout(() => {
         this.animation.length > 0 ? this.modalWrapper.classList.remove(`animate__${this.animation[0]}`, 'animate__animated') : this.modalWrapper.classList.remove('animate__animated');
         this.options.isOpen(this);
         this.isOpen = true;
         this.focus ? this.focusTrap() : '';
      }, this.speed);
   }

   close() {
      if (this.modalContainer && this.closeble) {
         if (this.animation.length > 0) {
            this.modalWrapper.classList.add(`animate__${this.animation[1]}`, 'animate__animated');
         } else {
            this.modalWrapper.classList.add('animate__animated');
            this.modalContainer.classList.remove('open');
         }
         setTimeout(() => {
            if (this.isOpen) {
               this.modalContainer.classList.remove('open');
               this.animation.length > 0 ? this.modalWrapper.classList.remove(`animate__${this.animation[1]}`, 'animate__animated') : this.modalWrapper.classList.remove('animate__animated');
               this.options.isClose(this);
               this.isOpen = false;
               this.focus ? this.focusTrap() : '';
               this.enableScroll();
            }
         }, this.speed);
      }
   }

   // для перелистывания фокуса в обратном порядке внутри модалки и наоборот
   focusCatch(e) {
      const focusable = this.modalContainer.querySelectorAll(this.focusElements);
      // превращаем псевдомасив в масив
      const focusArray = Array.prototype.slice.call(focusable);
      const focusedIndex = focusArray.indexOf(document.activeElement);

      if (e.shiftKey && focusedIndex === 0) {
         focusArray[focusArray.length - 1].focus();
         e.preventDefault();
      }

      if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
         focusArray[0].focus();
         e.preventDefault();
      }
   }

   focusTrap() {
      const focusable = this.modalContainer.querySelectorAll(this.focusElements);
      if (this.isOpen) {
         focusable[0].focus();
      } else {
         this.previousActiveElement.focus();
      }
   }

   disableScroll() {
      let pagePosition = window.scrollY;
      this.lockPadding();
      document.body.classList.add('lock');
      document.body.dataset.position = pagePosition;
      document.body.style.top = -pagePosition + 'px';
   }

   enableScroll() {
      let pagePosition = parseInt(document.body.dataset.position, 10);
      this.unlockPadding();
      document.body.style.top = 'auto';
      document.body.classList.remove('lock');
      window.scroll({ top: pagePosition, left: 0 });
      document.body.removeAttribute('data-position');
   }

   lockPadding() {
      let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
      this.fixBlocks.forEach((el) => {
         console.log(el);
         el.style.paddingRight = paddingOffset;
      });
      document.body.style.paddingRight = paddingOffset;
   }

   unlockPadding() {
      this.fixBlocks.forEach((el) => {
         el.style.paddingRight = '0px';
      });
      document.body.style.paddingRight = '0px';
   }
}

