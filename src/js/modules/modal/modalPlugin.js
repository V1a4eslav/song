export class Modal {
   constructor(options) {
      let defaultOptions = {
         isOpen: () => { },
         isClose: () => { },
      }
      this.options = Object.assign(defaultOptions, options);
      this.modalsParent = document.querySelector('.modals');
      this.speed = 300;
      this.animationOpen = 'fade';
      this.animationClose = '';
      this._reOpen = false;
      this._nextContainer = false;
      this.modalContainer = false;
      // ==================================
      this.modalWrapper = false;
      this.closeble = false;
      // ==================================
      this.isOpen = false;
      this.previousActiveElement = false;
      this._focusElements = [
         'a[href]',
         'input',
         'select',
         'textarea',
         'button',
         'iframe',
         '[contenteditable]',
         '[tabindex]:not([tabindex^="-"])'
      ];
      this._fixBlocks = document.querySelectorAll('.fix-block');
      this.events();
   }

   events() {
      if (this.modalsParent) {
         this.modalsParent.addEventListener("click", function (e) {
            const clickedElement = e.target.closest(`[data-path]`);
            if (clickedElement) {
               e.preventDefault();
               let target = clickedElement.dataset.path;
               let animationOpen = clickedElement.dataset.animationOpen;
               let animationClose = clickedElement.dataset.animationClose;
               let speed = clickedElement.dataset.speed;
               let closeble = clickedElement.dataset.closeble;
               this.closeble = closeble;
               this.animationOpen = animationOpen ? animationOpen : 'fade';
               this.animationClose = animationClose ? animationClose : 'fade-out';
               this.speed = speed ? parseInt(speed) : 300;
               this._nextContainer = this.modalsParent.querySelector(`[data-target=${target}]`);
               // ================================================
               this.modalWrapper = this._nextContainer.querySelector('.modal__wrapper');
               const closeBtn = this._nextContainer.querySelector('.modal__close');
               if (closeBtn && this.closeble) {
                  closeBtn.classList.add('disabled');
               }
               // ================================================
               this.open();
               return;
            }

            if (e.target.closest('.modal__close') && !this.closeble) {
               this.close();
               return;
            }
         }.bind(this));

         window.addEventListener('keydown', function (e) {
            if (e.keyCode == 27 && this.isOpen && !this.closeble) {
               this.close();
            }

            if (e.which == 9 && this.isOpen) {
               this.focusCatch(e);
            }
         }.bind(this));

         document.addEventListener("click", function (e) {
            if (!e.target.classList.contains('modal__content') && !e.target.closest('.modal__content') && this.isOpen && !this.closeble) {
               this.close();
            }
         }.bind(this));
      }
   }

   open(selector) {
      this.previousActiveElement = document.activeElement;
      if (this.isOpen) {
         this._reOpen = true;
         this.close();
         return;
      }
      this.modalContainer = this._nextContainer;

      if (selector) {
         this._nextContainer = this.modalsParent.querySelector(`[data-target=${selector}]`);
         this.modalContainer = this._nextContainer;
         this.modalWrapper = this._nextContainer.querySelector('.modal__wrapper');
         this.modalPath = document.querySelector(`[data-path="${selector}"]`);
         if (this.modalPath) {
            let animationOpen = this.modalPath.dataset.animationOpen;
            let animationClose = this.modalPath.dataset.animationClose;
            let speed = this.modalPath.dataset.speed;
            let closeble = this.modalPath.dataset.closeble;
            this.closeble = closeble;
            this.animationOpen = animationOpen ? animationOpen : 'fade';
            this.animationClose = animationClose ? animationClose : 'fade-out';
            this.speed = speed ? parseInt(speed) : 300;
         } else {
            // не всегда по клику открываетя модалка ,и параметры закидываем в таргет
            let animationOpen = this._nextContainer.dataset.animationOpen;
            let animationClose = this._nextContainer.dataset.animationClose;
            let speed = this._nextContainer.dataset.speed;
            let closeble = this._nextContainer.dataset.closeble;
            this.closeble = closeble;
            this.animationOpen = animationOpen ? animationOpen : 'fade';
            this.animationClose = animationClose ? animationClose : 'fade-out';
            this.speed = speed ? parseInt(speed) : 300;
         }
         const closeBtn = this.modalContainer.querySelector('.modal__close');
         if (closeBtn && this.closeble) {
            closeBtn.classList.add('disabled');
         }
      }

      this.modalsParent.style.setProperty('--transition-time', `${this.speed / 1000}s`);
      this.modalsParent.classList.add('is-open');

      document.body.style.scrollBehavior = 'auto';
      document.documentElement.style.scrollBehavior = 'auto';

      this.disableScroll();

      this.modalContainer.classList.add('open');
      // =============================================
      this.modalWrapper.classList.add(this.animationOpen, 'animate__animated');
      // =============================================
      setTimeout(() => {
         this.modalWrapper.classList.remove(this.animationOpen, 'animate__animated');
         this.isOpen = true;
         this.options.isOpen(this);
         this.focusTrap();
      }, this.speed);
   }

   close() {
      if (this.modalContainer) {
         this.modalWrapper.classList.add(this.animationClose, 'animate__animated');

         // ===========================================
         if (this._reOpen) {
            this.modalContainer.classList.add('open');
            const previousWrapper = this.modalContainer.querySelector('.modal__wrapper');
            previousWrapper.classList.add(this.animationClose, 'animate__animated');
            setTimeout(() => {
               previousWrapper.classList.remove(this.animationClose, 'animate__animated');
            }, this.speed);
         }
         // ===========================================

         setTimeout(() => {
            if (this.isOpen) {
               this.modalContainer.classList.remove('open');
               this.modalsParent.classList.remove('is-open');
               this.modalWrapper.classList.remove(this.animationClose, 'animate__animated');

               this.enableScroll();

               document.body.style.scrollBehavior = 'auto';
               document.documentElement.style.scrollBehavior = 'auto';

               this.options.isClose(this);
               this.isOpen = false;
               this.focusTrap();

               if (this._reOpen) {
                  this._reOpen = false;
                  this.open();
               }
            }
         }, this.speed);
      }
   }

   focusCatch(e) {
      const nodes = this.modalContainer.querySelectorAll(this._focusElements);
      const nodesArray = Array.prototype.slice.call(nodes);
      const focusedItemIndex = nodesArray.indexOf(document.activeElement)
      if (e.shiftKey && focusedItemIndex === 0) {
         nodesArray[nodesArray.length - 1].focus();
         e.preventDefault();
      }
      if (!e.shiftKey && focusedItemIndex === nodesArray.length - 1) {
         nodesArray[0].focus();
         e.preventDefault();
      }
   }

   focusTrap() {
      const nodes = this.modalContainer.querySelectorAll(this._focusElements);
      if (this.isOpen) {
         if (nodes.length) nodes[0].focus();
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
      window.scroll({
         top: pagePosition,
         left: 0
      });
      document.body.removeAttribute('data-position');
   }

   lockPadding() {
      let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
      this._fixBlocks.forEach((el) => {
         el.style.paddingRight = paddingOffset;
      });
      document.body.style.paddingRight = paddingOffset;
   }

   unlockPadding() {
      this._fixBlocks.forEach((el) => {
         el.style.paddingRight = '0px';
      });
      document.body.style.paddingRight = '0px';
   }
}