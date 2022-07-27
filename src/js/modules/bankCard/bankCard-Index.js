import { CardBank } from './bankCardPlugin.js';

const card = new CardBank('cardBank', {
   isChanged: (card) => {
      console.log(card);
      if (check(card.$cardReqField)) {
         console.log('+');
      } else {
         console.log('-');
      }
   }
});

const check = function _checkValidField(fields) {
   const fieldsArray = [...fields];
   return fieldsArray.every(item => item.classList.contains('_valid'));
}

