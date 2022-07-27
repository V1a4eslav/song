import { Modal } from './modalPlugin.js';

class ModalAuth extends Modal {
   constructor(options) {
      super(options);
      this._defaultOpen()
   }
   // =====================================================
   _defaultOpen() {
      document.addEventListener("DOMContentLoaded", () => {
         if (window.location.pathname === "/auth.html") {
            setTimeout(() => {
               this.open('signIn')
            }, 500);
         }
      });
   }

   // =====================================================
}


const modalAuth = new ModalAuth({
   isOpen: (modal) => {
      console.log(modal);
      console.log('opened');
   },
   isClose: () => {
      console.log('closed');
   },
})