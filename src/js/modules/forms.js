
const tips = {
   tipsEn: {
      required: "Pole obowiązkowe",
      requiredPhone: "Wpisz numer telefonu",
      requiredName: "Wpisz imię",
      requiredMail: "Wpisz adres e-mail",
      requiredText: "Wpisz tekst",
      lengthMinName: "Minimum 2 znaki",
      lengthMinPassword: "Co najmniej 4 znaki",
      easyPassword: "Tylko znaki łacińskie z literami lub cyframi. Długość musi mieć od 5 do 15 znaków",
      validEmail: "Wpisz poprawny format poczty",
      validPhone: "Wpisz poprawny numer telefonu",
      onlyNumbers: "Tylko cyfry",
      validName: "Tylko litery",
      formatFile: "Niepoprawny format pliku",
      sizeFile: "Rozmiar pliku musi wynosić do 2 MB",
      success: "ok",
      conform: "Pola hasła nie pasują do siebie",
      lengthMinMessage: "Minimum 10 znaków",
      phonePrefix: "Zaczynając od '+'"
   }
}

const forms = document.querySelectorAll('._valid-form');
if (forms.length > 0) {
   forms.forEach(form => {
      form.querySelectorAll('._valid-input').forEach(elem => {
         elem.addEventListener('blur', () => checkInput(elem));
      });
   });
}

function checkInput(elem) {
   const type = elem.getAttribute('data-type') ? elem.getAttribute('data-type') : elem.type;

   if (type === 'email') {
      if (elem.value === "") {
         tipMessage(elem, tips.tipsEn.requiredMail, true);
         return true;
      } else if (!(/^(([^А-Яа-я<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(elem.value))) {
         tipMessage(elem, tips.tipsEn.validEmail, true);
         return true;
      } else {
         tipMessage(elem, tips.tipsEn.success, false);
         return false;
      }
   }

   if (type === 'text') {
      if (elem.value === "") {
         tipMessage(elem, tips.tipsEn.required, true);
         return true;
      } else if (elem.value.length < 2) {
         tipMessage(elem, tips.tipsEn.lengthMinName, true);
         return true;
      } else {
         tipMessage(elem, tips.tipsEn.success, false);
         return false;
      }
   }

   if (type === 'tel') {
      if (elem.value === "") {
         tipMessage(elem, tips.tipsEn.requiredPhone, true);
         return true;
      } else if (!(/^[\d\s+()]{1,}$/.test(elem.value))) {
         tipMessage(elem, tips.tipsEn.onlyNumbers, true);
         return true;
      } else if (elem.value.length <= 5 || elem.value.length > 21) {
         tipMessage(elem, tips.tipsEn.validPhone, true);
         return true;
      } else {
         tipMessage(elem, tips.tipsEn.success, false);
         return false;
      }
   }

   if (type === 'name') {
      if (elem.value === "") {
         tipMessage(elem, tips.tipsEn.required, true);
         return true;
      } else if (elem.value.length < 3) {
         tipMessage(elem, tips.tipsEn.lengthMinName, true);
         return true;
      } else if (!(/^[A-Za-zА-Яа\s\'\-]{2,40}$/.test(elem.value))) {
         tipMessage(elem, tips.tipsEn.validName, true);
         return true;
      } else {
         tipMessage(elem, tips.tipsEn.success, false);
         return false;
      }
   }

   if (type === 'customCheckbox') {
      if (!elem.checked) {
         tipMessage(elem, tips.tipsEn.tips.required, true);
         return true;
      } else {
         tipMessage(elem, tips.tipsEn.success, false);
         return false;
      }
   };
}


function tipMessage(elem, tip, status) {
   const mainParent = elem.closest('.form-group');
   const fieldParent = elem.closest('.field-parent');
   const tipElementHtml = fieldParent.querySelector('.tips');

   if (!status) {
      mainParent.classList.remove('error');
      mainParent.classList.add('success');
      mainParent.setAttribute('data-error', tip);
      tipElementHtml.classList.remove('tips-hidden', 'tips-wrong');
      tipElementHtml.classList.add('tips-success', 'tips-visibility');
      tipElementHtml.textContent = tip;
   } else {
      mainParent.classList.add('error');
      mainParent.classList.remove('success');
      mainParent.setAttribute('data-error', tip);
      tipElementHtml.classList.remove('tips-hidden', 'tips-success');
      tipElementHtml.classList.add('tips-wrong', 'tips-visibility');
      tipElementHtml.textContent = tip;
   }
}

/*
Добавить тегу form два класса class="_valid-form form-group";
Каждый инпут оборачиваем в обертку с классом class="field-parent".указываем ему posr
Каждому инпуту добавляем класс class="_valid-input"
Под инпутом или перед закрывающим тегом field-parent мы добавляем span c классами что указаны class="tips tips-hidden". указываем ему posa
// ====================================================================== //
<form class="_valid-form form-group" name="faqForm">
   <div class="form-faq__input-body field-parent">
      <input class="form-faq__input _valid-input" name="Your Name" data-type="name" type="text"
         placeholder="Your Name">
      <span class="form-faq__tips tips tips-hidden"></span>
   </div>
</form>
*/