import { DOM } from '../../../variables.js';
import { htmlToElement } from '../../functions.js';

// function noop() { }

// function _createModalAuthBtns(buttons = []) {
//    if (buttons.length > 0) {
//       // создаем кореневой элемент
//       const modalHeader = document.createElement('div');
//       modalHeader.classList.add('modal__header', 'header-modal');

//       buttons.forEach(btn => {
//          const $btn = document.createElement('button');
//          $btn.classList.add('header-modal__btn');
//          $btn.textContent = ;
//          $btn.onclick = btn.handler || noop;
//          modalHeader.appendChild($btn);
//       })

//       return modalHeader;
//    }
// }


function _createModal(options) {
   const templateItemHtml = document.querySelector('#modalAuth').innerHTML.trim()
      .replace('{closeModalButton}', options.closeble ? '<button class="modal__close-btn" data-close="true">x</button>' : '');
   return htmlToElement(templateItemHtml);
}

function _renderModal(options) {
   DOM.auth.appendChild(_createModal(options));
}

$.modal = function (options) {
   const $modal = _renderModal(options);
   const _ANIMATIONspeed = 1000;
   let closing = false;
   let destroyed = false;

   const listener = event => {
      if (event.target.dataset.close) {
         modal.close();
      }
   }

   const modal = {
      open() {
         if (destroyed) {
            return console.log('Modal is destroyed');;
         }

         if (!closing) {
            $modal.classList.add('open');
            const modalWrapper = document.querySelector('.modal__wrapper');
            modalWrapper.classList.add('animate__backInDown', 'animate__animated');
            document.body.classList.add('lock');
            setTimeout(() => {
               modalWrapper.classList.remove('animate__backInDown');
               modalWrapper.classList.remove('animate__animated');
            }, _ANIMATIONspeed);
         }
      },

      close() {
         closing = true;
         $modal.classList.remove('open');
         const modalWrapper = document.querySelector('.modal__wrapper');
         modalWrapper.classList.add('animate__backOutUp');
         modalWrapper.classList.add('animate__animated');
         document.body.classList.remove('lock');
         setTimeout(() => {
            modalWrapper.classList.remove('animate__backOutUp');
            modalWrapper.classList.remove('animate__animated');
            closing = false;
         }, _ANIMATIONspeed);
      }
   }

   $modal.addEventListener("click", listener);

   return Object.assign(modal, {
      destroy() {
         $modal.parentNode.removeChild($modal);
         $modal.removeEventListener("click", listener);
         destroyed = true;
      }
   });
}
