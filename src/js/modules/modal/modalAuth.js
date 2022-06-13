import { Modal } from './modalPlugin.js';
import { htmlToElement } from '../functions.js';


class ModalAuth extends Modal {
   constructor(options) {
      super(options);
      this.authLinks = options.authLinks;
      this.authSignIn = options.signInArray;
      this.authSignUp = options.signUpArray;
      this._renderModal();
      this._defaultOpen();
   }
   // =====================================================
   _defaultOpen() {
      window.onload = function () {
         if (window.location.pathname === "/index.html") {
            this.modalContainer = document.querySelector('[data-target="signin"]');
            if (this.modalContainer) {
               this.modalOverlay = this.modalContainer.querySelector('.modal__overlay');
               this.modalWrapper = this.modalOverlay.querySelector('.modal__wrapper');
               this.open();
            }
         }
      }.bind(this);
      // =====================================================
   }

   _htmlToElement(html) {
      const template = this.modals.createElement('template');
      template.innerHTML = html;
      return template.content.firstChild;
   }


   _createAuthLinks(links) {
      if (links.length > 0) {
         const toHtml = btn => `<button onclick="${btn.handler}" class="header-modal__btn" style="background-color:${btn.color}">SIGN IN WITH ${btn.title}<span id="header-modal__btn_img" style="background-image: url('${btn.icon}'); border-right-color: ${btn.borderColor}"></span></button>`;
         const htmlBtns = links.map(toHtml).join('');
         return htmlBtns;
      }
   }

   _creaInputsField(fieldArray) {
      if (fieldArray.length > 0) {
         const toHtml = input => `
         <div class="modal__input-body field-parent">
         <input class="modal__input ${input.valid ? '_valid-input' : ''}" name="${input.name}" data-type="${input.dataType}" type="${input.type}"
            placeholder="${input.placeholder}">
         <span class="modal__tips tips tips-hidden"></span>
      </div>`

         const htmlField = fieldArray.map(toHtml).join('');
         return htmlField;
      }
   }

   _createModalSignIn() {
      const templateItemHtml = document.querySelector('#modalAuth').innerHTML.trim()
         .replace('{closeModalButton}', this.closeble ? '<button class="modal__close-btn" data-close="true">x</button>' : '')
         .replace('{headerModal}', this._createAuthLinks(this.authLinks))
         .replace('{field}', this._creaInputsField(this.authSignIn))
         .replace('{dataTarget}', 'signin')
         .replace('{dataPath}', '<button class="footer-modal__signup-link" data-path="signup">Not a member? Sign Up</button>')
      return htmlToElement(templateItemHtml);
   }

   _createModalSignUp() {
      const templateItemHtml = document.querySelector('#modalAuth').innerHTML.trim()
         .replace('{closeModalButton}', this.closeble ? '<button class="modal__close-btn" data-close="true">x</button>' : '')
         .replace('{headerModal}', this._createAuthLinks(this.authLinks))
         .replace('{field}', this._creaInputsField(this.authSignUp))
         .replace('{dataTarget}', 'signup')
         .replace('{dataPath}', '<button class="footer-modal__signin-link" data-path="signin">Already a member? Sign In</button>')
      return htmlToElement(templateItemHtml);
   }

   _renderModal() {
      if (this.modals) {
         this.modals.appendChild(this._createModalSignIn());
         this.modals.appendChild(this._createModalSignUp());
      }
   }
}


const signInModal = new ModalAuth({
   speed: 1000,
   animation: ['backInDown', 'backOutUp'],
   closeble: false,
   authLinks: [
      {
         title: 'google',
         color: '#4CAF50',
         borderColor: '#199c47',
         icon: '../img/user/auth/icons/google.svg',
         handler() {
            console.log(`click on ${this.title}`);
         }
      },
      {
         title: 'facebook',
         color: '#4C69BA',
         borderColor: '#364e92',
         icon: '../img/user/auth/icons/facebook.svg',
         handler() {
            console.log(`click on ${this.title}`);
         }
      },
   ],
   signInArray: [
      {
         tag: 'input',
         name: 'E-mail',
         type: 'email',
         placeholder: 'E-mail@mail.com',
         dataType: 'email',
         valid: true
      },
      {
         tag: 'input',
         name: 'Password',
         type: 'password',
         placeholder: 'password',
         dataType: 'password',
         valid: true
      },
   ],
   signUpArray: [
      {
         tag: 'input',
         name: 'First name',
         type: 'text',
         placeholder: 'First name',
         dataType: 'text',
         valid: true
      },
      {
         tag: 'input',
         name: 'Surname',
         type: 'text',
         placeholder: 'Surname (Optional)',
         dataType: 'text',
         valid: false
      },
      {
         tag: 'input',
         name: 'Alias/Stag',
         type: 'text',
         placeholder: 'Alias/Stag name (Optional)',
         dataType: 'text',
         valid: false
      },
      {
         tag: 'input',
         name: 'E-mail',
         type: 'email',
         placeholder: 'E-mail@mail.com',
         dataType: 'email',
         valid: true
      },
   ],
   isOpen: (authModal) => {
      console.log(authModal);
      console.log('opened');
   },
   isClose: (authModal) => {
      console.log('closed');
   }
});
