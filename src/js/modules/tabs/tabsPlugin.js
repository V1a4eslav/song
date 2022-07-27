export class Tabs {
   constructor(selector, options) {
      let defaultOptions = {
         isChanged: () => { }
      }
      this.options = Object.assign(defaultOptions, options);
      this.selector = selector;
      this.tabs = document.querySelector(`[data-tabs=${selector}]`);
      this.defaultVisibleIndex = options.defaultVisibleIndex;
      if (this.tabs) {
         this.tabsParent = this.tabs.querySelector('[data-tabsparent]');
         this.tabBtns = this.tabsParent.querySelectorAll('[data-tab]');
         this.tabContents = this.tabs.querySelectorAll('[data-tabContent]');
      } else {
         console.error("Такого селектора data-tabs не существует");
         return;
      }

      this.check();
      this.init();
      this.events();
   }

   check() {
      if (document.querySelectorAll(`[data-tabs="${this.selector}"]`).length > 1) {
         console.error('Количество элементов с одинаковым data-tabs больше одного!');
         return;
      }

      if (this.tabBtns.length !== this.tabContents.length) {
         console.error('Количество кнопок и элементов табов не совпадает!');
         return;
      }

      if (this.visibleIndex >= (this.tabBtns.length)) {
         console.error(" visibleIndex указан больше чем число табов");
         return;
      }
   }

   init() {
      this.tabsParent.setAttribute('role', 'tablist');

      this.tabBtns.forEach((el, i) => {
         el.setAttribute('role', 'tab');
         el.setAttribute('tabindex', '-1');
         el.setAttribute('id', `${this.selector}${i + 1}`);
         el.classList.remove('active');
      });

      this.tabContents.forEach((el, i) => {
         el.setAttribute('role', 'tabpanel');
         el.setAttribute('tabindex', '-1');
         el.setAttribute('aria-labelledby', this.tabBtns[i].id);
         el.classList.remove('active');
      })

      if (this.defaultVisibleIndex) {
         this.tabBtns[this.defaultVisibleIndex].classList.add('active');
         this.tabBtns[this.defaultVisibleIndex].removeAttribute('tabindex');
         this.tabBtns[this.defaultVisibleIndex].setAttribute('aria-selected', 'true');
         this.tabContents[this.defaultVisibleIndex].classList.add('active');
      } else {
         this.tabBtns[0].classList.add('active');
         this.tabBtns[0].removeAttribute('tabindex');
         this.tabBtns[0].setAttribute('aria-selected', 'true');
         this.tabContents[0].classList.add('active');
      }
   }

   events() {
      this.tabBtns.forEach((el, i) => {
         el.addEventListener("click", (e) => {
            let currentTab = this.tabsParent.querySelector('[aria-selected]');
            if (e.currentTarget !== currentTab) {
               this.switchTabs(e.currentTarget, currentTab);
            }
         });

         el.addEventListener('keydown', (e) => {
            let index = Array.prototype.indexOf.call(this.tabBtns, e.currentTarget);

            let dir = null;

            if (e.which === 37) {
               dir = index - 1;
            } else if (e.which === 39) {
               dir = index + 1;
            } else if (e.which === 40) {
               dir = 'down';
            } else {
               dir = null;
            }

            if (dir !== null) {
               if (dir === 'down') {
                  this.tabContents[i].focus();
               } else if (this.tabBtns[dir]) {
                  this.switchTabs(this.tabBtns[dir], e.currentTarget);
               }
            }
         })

      });
   }

   switchTabs(newTab, oldTab = this.tabs.querySelector('[aria-selected]')) {
      newTab.focus();
      newTab.removeAttribute('tabindex');
      newTab.setAttribute('aria-selected', 'true');

      oldTab.removeAttribute('aria-selected');
      oldTab.setAttribute('tabindex', '-1');

      let index = Array.prototype.indexOf.call(this.tabBtns, newTab);
      let oldIndex = Array.prototype.indexOf.call(this.tabBtns, oldTab);

      this.tabContents[oldIndex].classList.remove('active');
      this.tabContents[index].classList.add('active');

      this.tabBtns[oldIndex].classList.remove('active');
      this.tabBtns[index].classList.add('active');

      this.options.isChanged(this);
   }
}

/*
Для обертки табов задаем data-tabs="tab"
Для родителя табов задаем data-tabsparent
Для табов задаем data-tab
Для сонтента задаем data-tabContent
*/