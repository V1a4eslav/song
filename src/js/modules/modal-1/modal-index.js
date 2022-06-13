import { DOM } from '../../variables.js';
import './bace.js';
import './plugins/modal.js';

/*
Данный файл будет отвечать за само приложение по этому мы его подключаем
в самом конце,а в нашем случае импортив все в него

В этом файле я хочу чтоб плагин создавался таким образом
$.modal()
Сдесь мы хотим настроить свое модальное окно и получить его работчее состояние
*/
const authBtns = [
   {
      title: 'google',
      color: '#4CAF50',
      borderColor: '#199c47',
      icon: '../../../img/user/auth/icons/google.svg',
      handler() {
         console.log(`click on ${title}`);
      }
   },
   {
      title: 'facebook',
      color: '#4C69BA',
      borderColor: '#364e92',
      icon: '../../../img/user/auth/icons/facebook.svg',
      handler() {
         console.log(`click on ${title}`);
      }
   },
];

const toHtml = btn => `
<button class="header-modal__btn" style="color:${btn.color}>SIGN IN WITH ${btn.title}<span id="header-modal__btn_img" style="background-image: ${btn.icon}; border-right-color: ${btn.borderColor}"></span></button>
`
function renderBtnInModal() {
   const htmlBtns = authBtns.map(toHtml).join('');
   document.querySelector('.modal__header').innerHTML = htmlBtns;
}

const modal = $.modal({
   title: 'sign-in',
   closeble: true,
   authLink: authBtns,
});
DOM.userHeader.addEventListener("click", function (e) {
   e.preventDefault();
   modal.open();

   renderBtnInModal();
});
