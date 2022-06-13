import { DOM } from "../variables.js";

export function burgerFuntions(e) {
   if (DOM.iconMenu && e.target.closest('.icon-menu')) {
      this.classList.toggle('menu-open')
      document.body.classList.toggle('lock')
      if (this.classList.contains('menu-open')) {
         DOM.headerNav.classList.add('open')
      } else {
         DOM.headerNav.classList.remove('open')
      }
   }
}

