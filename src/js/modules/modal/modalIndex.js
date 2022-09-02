import { Modal } from './modalPlugin.js';

class ModalAuth extends Modal {
   constructor(options) {
      super(options);
      this._defaultOpen()
   }
   // =====================================================
   _defaultOpen() {
      document.addEventListener("DOMContentLoaded", () => {
         setTimeout(() => {
            this.open('signIn')
         }, 500);
      });
   }

   // =====================================================
}

export function modalAuth() {
   const modalAuth = new ModalAuth(
      {
         isOpen: (modal) => {
            console.log(modal);
            console.log('opened');
         },
         isClose: () => {
            console.log('closed');
         },
      }
   )
}
