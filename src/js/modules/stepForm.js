import { Modal } from './modal/modalPlugin.js';
// add modul noUiSlider
import './range/nouislider.min.js';
import { range } from './range/range.js';
// ======================================
import { _slideUp, _slideDown } from './spollers.js';
// add modul card instans
import { card } from './bankCard/bankCard-Index.js';
// add modul select
import './select/select-app.js';
import { createSelect } from './select/select-app.js';

const modalSuccessful = new Modal({
   isOpen: (modal) => {
      console.log(modal);
      console.log('opened');
   },
   isClose: () => {
      console.log('closed');
   },
});


export function stepsForm() {
   const stepContentParent = document.querySelector('[data-step="content-parent"]');
   if (!stepContentParent) return;
   const creatrSteps = document.querySelectorAll('[data-step="title"]');
   const creatrStepForms = stepContentParent.querySelectorAll('[data-step="form"]');
   const btnFinnish = stepContentParent.querySelector('[data-btn="finnish"]');

   let activeContent;
   let dataBtn;
   let reqFields;
   let otherFields;
   let rangeSlider;

   init();

   rangeSlider.noUiSlider.on('end', () => checkDisabledBtn(reqFields, dataBtn));

   stepContentParent.addEventListener("click", function (e) {
      activeContent = findActiveContent(creatrStepForms);
      defineVariables(activeContent);
      checkFields(reqFields);
      checkFields(otherFields);
      checkDisabledBtn(reqFields, dataBtn);

      if (e.target === dataBtn && e.target != btnFinnish) {
         creatrStepForms.forEach((el, i) => {
            if (el === activeContent) {
               creatrStepForms[i].classList.remove('_active');
               creatrStepForms[i + 1].classList.add('_active');
               creatrSteps[i + 1].classList.add('_active');
            }
         });
         activeContent = findActiveContent(creatrStepForms);

         setTimeout(() => {
            SmoothScrollBy(document.querySelector('.header'))
         }, 500);

      }

      if (e.target.hasAttribute('data-skip') && e.target.classList.contains('pulse')) {
         skip(e.target);
      }

      if (e.target.hasAttribute('data-show') && e.target.closest('[data-stepItem]')) {
         const parent = e.target.closest('[data-stepItem]');
         const text = parent.querySelector('[data-text]');
         const arrowIcon = parent.querySelector('.show-arrow');
         if (text.classList.contains('open')) {
            _slideUp(text);
            text.classList.remove('open');
            arrowIcon.classList.remove('up');
         } else {
            _slideDown(text);
            text.classList.add('open');
            arrowIcon.classList.add('up');
         }
      }

      if (e.target.hasAttribute('data-skip') && e.target.closest('[data-stepItem]')) {
         const parent = e.target.closest('[data-stepItem]');
         const skip = parent.querySelector('[data-skip]');
         if (parent.querySelector('textarea[data-checkurl]') || parent.querySelector('textarea[data-check="inputField"]')) {
            const textareaCheckurl = parent.querySelector('textarea[data-checkurl]');
            const textareaField = parent.querySelector('textarea[data-check="inputField"]');
            if (textareaCheckurl && textareaCheckurl.value != '') {
               textareaCheckurl.value = '';
               skip.classList.remove('active');
            }
            if (textareaField && textareaField.value != '') {
               textareaField.value = '';
               skip.classList.remove('active');
            }
         }
      }

      if (e.target === btnFinnish) {
         creatrStepForms.forEach(element => element.classList.remove('_active'));
         creatrSteps.forEach(element => element.classList.remove('_active'));

         modalSuccessful.open('successful');
         setTimeout(() => {
            modalSuccessful.close();
         }, 3000);

         creatrStepForms[0].classList.add('_active');
         creatrSteps[0].classList.add('_active');

         const allFields = stepContentParent.querySelectorAll('[data-stepItem]');
         const allSubmitBtns = stepContentParent.querySelectorAll('[data-btn]');

         resetItems(allFields);

         allSubmitBtns.forEach(btn => btn.disabled = true);

         setTimeout(() => {
            SmoothScrollBy(document.querySelector('.header'))
         }, 4000);
      }

   });


   function init() {
      clearActive(creatrSteps);
      clearActive(creatrStepForms);
      addDefaultActive(creatrSteps, creatrStepForms);
      activeContent = findActiveContent(creatrStepForms);
      defineVariables(activeContent);
      rangeSlider = range();
   }

   function defineVariables(content) {
      dataBtn = content.querySelector('[data-btn]');
      if (content.querySelector('[data-tabs="tab"]')) {
         reqFields = difineReqFieldInTab(content.querySelector('[data-tabs="tab"]'));
      } else {
         reqFields = content.querySelectorAll('[data-stepItem="req"]');
      }
      otherFields = content.querySelectorAll('[data-stepItem="not-req"]');
   }

   function difineReqFieldInTab(tabsBlock) {
      return tabsBlock.querySelectorAll('.step-content-two__item.active');
   }

   function checkFields(fields) {
      if (fields.length) {
         fields.forEach(el => {
            check(el);
         });
      }
   }

   function check(el) {
      if (el.querySelectorAll('[data-check="checkbox"]').length) {
         const checkboxes = el.querySelectorAll('[data-check="checkbox"]');
         const isChecked = [...checkboxes].some(elem => elem.checked);
         if (isChecked) {
            el.classList.add('choosen');
         } else {
            el.classList.remove('choosen');
         }
      }

      if (el.querySelectorAll('[data-check').length) {
         const array = el.querySelectorAll('[data-check');
         const arrayString = array[0].getAttribute('data-check').split('-');
         if (arrayString[1] === 'max' && arrayString.length === 3) {
            const maxChoose = +arrayString[2];

            const newCheckedArr = [...array].filter(item => item.checked === true);
            const newNotCheckedArr = [...array].filter(item => item.checked === false);

            if (newCheckedArr.length <= maxChoose && newCheckedArr.length > 0) {
               el.classList.add('choosen');
            } else {
               el.classList.remove('choosen');
            }

            if (newCheckedArr.length === maxChoose) {
               newNotCheckedArr.forEach(item => {
                  item.disabled = true;
                  item.parentElement.classList.add('disabled');
               });
            } else {
               newNotCheckedArr.forEach(item => {
                  item.disabled = false;
                  item.parentElement.classList.remove('disabled');
               });
            }
         }
      }

      if (card.$card.closest('.create__step-content._active') && card.$card.closest('.step-content-two__item.active')) {
         card.$inputNumber.addEventListener('input', () => _checkCardFields(el, reqFields, dataBtn));
         card.$cvvInput.addEventListener('input', () => _checkCardFields(el, reqFields, dataBtn));
         card.$inputYear.addEventListener('input', () => _checkCardFields(el, reqFields, dataBtn));
         card.$inputMonth.addEventListener('input', () => _checkCardFields(el, reqFields, dataBtn));
      }

      if (el.querySelector('.form-group')) {
         const formGroup = el.querySelector('.form-group');
         const tips = formGroup.querySelectorAll('.tips');
         const validInputs = formGroup.querySelectorAll('._valid-input');
         validInputs.forEach(inputField => {
            inputField.addEventListener("input", function (e) {
               const result = [...tips].every(tip => tip.classList.contains('tips-success'));
               if (result) {
                  el.classList.add('choosen')
               } else {
                  el.classList.remove('choosen');
               }
               checkDisabledBtn(reqFields, dataBtn);
            });
         });
      }

      if (el === document.querySelector('[data-accept]')) {
         const accept = el.querySelector('[data-input="accept"]');
         if (accept.checked === true) {
            el.classList.add('choosen')
         } else {
            el.classList.remove('choosen');
         }
         checkDisabledBtn(reqFields, dataBtn);
      }

      if (el.querySelector('[data-check="inputField"]')) {
         const input = el.querySelector('[data-check="inputField"]');
         const skip = el.querySelector('[data-skip]');
         input.addEventListener("input", function (e) {
            if (input.value !== '') {
               el.classList.add('choosen');
               if (skip) skip.classList.add('active');
            } else {
               el.classList.remove('choosen');
               if (skip) skip.classList.remove('active');
            }
         });
      }

      if (el.querySelector('[data-checkurl]')) {
         const input = el.querySelector('[data-checkurl]');
         const skip = el.querySelector('[data-skip]');

         let data = +(input.dataset.checkurl);

         input.addEventListener("input", function (e) {
            const inputLinks = input.value.split(' ');
            let validLinks = [];
            if (inputLinks.length) {
               validLinks = inputLinks.filter(item => validURL(item));
               if (validLinks.length > 0 && validLinks.length <= data) {
                  el.classList.add('choosen');
                  if (skip) {
                     skip.classList.add('active');
                  }
               } else if (!validLinks.length) {
                  el.classList.remove('choosen');
                  if (skip) {
                     skip.classList.remove('active');
                  }
               }
            }
            if (validLinks.length === data) {
               input.value = validLinks.join(' ');
            }
         });
      }

      if (el.querySelector('[data-choosen]')) {
         const parentRadioBtns = el.querySelector('[data-choosen]');
         const inputs = parentRadioBtns.querySelectorAll('[type="radio"]');

         inputs[0].addEventListener("change", function (e) {
            if (this.checked) {
               el.querySelector('[data-skip]').classList.add('pulse');
            }
         });
         inputs[1].addEventListener("change", function (e) {
            if (this.checked) {
               el.querySelector('[data-skip]').classList.remove('pulse');
            }
         });
      }
   }

   function resetItems(items) {
      items.forEach(el => {
         if (el.querySelectorAll('[data-check').length) {
            const checkboxes = el.querySelectorAll('[data-check]');
            const checkItems = [...checkboxes].filter(input => input.checked);
            const disabledItems = [...checkboxes].filter(input => input.disabled === true);
            if (checkItems) checkItems.forEach(input => input.checked = false);
            if (disabledItems) disabledItems.forEach(input => input.disabled = false);

            el.classList.contains('choosen') ? el.classList.remove('choosen') : '';
         }

         if (card.$card.closest('.create__step-content') && card.$card.closest('.step-content-two__item.active')) {
            el.classList.remove('choosen');
            card.$inputNumber.classList.remove('_valid');
            card.$cvvInput.classList.remove('_valid');
            card.$inputYear.classList.remove('_valid');
            card.$inputMonth.classList.remove('_valid');
            card.$cvvInput.disabled = true;
            card.$inputYear.disabled = true;
            card.$inputMonth.disabled = true;
            card.$inputNumber.value = '';
            card.$cvvInput.value = '';
            card.$inputYear.value = '';
            card.$inputMonth.value = '';
            card._renderDataCard(card.defaultCard.getBank, card.defaultCard.number, card.defaultCard.getBrand);
         }

         if (el.querySelector('[data-select]')) {
            clearSelect(createSelect);
            el.classList.remove('choosen');
         }

         if (el.contains(rangeSlider)) {
            rangeSlider.noUiSlider.reset();
            el.querySelector('[data-skip]').classList.remove('choosen');
            el.querySelector('[data-skip]').classList.remove('active');
            el.classList.remove('choosen');
         }

         if (el.querySelector('[data-check="inputField"]')) {
            const input = el.querySelector('[data-check="inputField"]');
            const skip = el.querySelector('[data-skip]');
            input.value != '' ? input.value = '' : '';
            if (skip) skip.classList.remove('active');
            el.classList.remove('choosen');
         }

         if (el.querySelector('[data-checkurl]')) {
            el.querySelector('[data-checkurl]').value != '' ? el.querySelector('[data-checkurl]').value = '' : '';
            if (el.querySelector('[data-skip]')) {
               el.querySelector('[data-skip]').classList.remove('active');
            }
            el.classList.remove('choosen');
         }

         if (el.contains(el.querySelector("[data-skip]")) && el.querySelector("[data-skip]").classList.contains('pulse')) {
            skip(el.querySelector('[data-skip]'));
         }

         if (el.querySelector('._valid-form') && el.classList.contains('choosen')) {
            const parent = el.querySelector('._valid-form');
            const inputs = parent.querySelectorAll('._valid-input');
            const tips = parent.querySelectorAll('.tips');
            inputs.forEach(input => input.value = '');
            tips.forEach(tip => {
               if (tip.innerHTML != '') {
                  tip.innerHTML = '';
                  tip.classList.remove('tips-visibility');
                  tip.classList.contains('tips-success') ? tip.classList.remove('tips-success') : tip.classList.remove('tips-wrong');
                  tip.classList.add('tips-hidden');
               }
            });
            el.classList.remove('choosen')
         }

      });
   }


   function skip(item) {
      item.classList.remove('pulse');
      if (item.closest('[data-stepItem]')) {
         const parent = item.closest('[data-stepItem]');
         const inputs = parent.querySelectorAll('[type="radio"]');
         if (inputs.length > 1) {
            inputs[0].checked = false;
            inputs[1].checked = true;
         }
      }
   }

   function clearSelect(select) {
      if (select) {
         select.$value.innerHTML = select.options.placeholder;
         select.selectedId = select.options.defaultId;
         select.$el.querySelectorAll('[data-type="select-item"]').forEach(element => {
            element.classList.remove('selected');
         });

      }
   }

   function SmoothScrollBy(header) {
      const createStepsParent = document.querySelector('[data-create="steps"]');
      if (header) {
         window.scroll({
            top: createStepsParent.offsetTop - header.offsetHeight,
            left: 0,
            behavior: 'smooth'
         });
      } else {
         window.scroll({
            top: createStepsParent.offsetTop,
            left: 0,
            behavior: 'smooth'
         });
      }
   }

   function validURL(str) {
      var pattern = new RegExp('^((ft|htt)ps?:\\/\\/)?' + // protocol
         '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name and extension
         '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
         '(\\:\\d+)?' + // port
         '(\\/[-a-z\\d%@_.~+&:]*)*' + // path
         '(\\?[;&a-z\\d%@_.,~+&:=-]*)?' + // query string
         '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
      return pattern.test(str);
   }

   function clearActive(array) {
      array.forEach(element => {
         element.classList.remove('_active');
      });
   }

   function addDefaultActive(title, content) {
      if (title && content) {
         title[0].classList.add('_active');
         content[0].classList.add('_active');
      }
   }

   function findActiveContent(array) {
      return [...array].find(item => item.classList.contains('_active'));
   }

   function _checkCardFields(el, reqItems, btn) {
      if (_checkValidField(card.$cardReqField)) {
         el.classList.add('choosen');
      } else {
         el.classList.remove('choosen');
      }
      checkDisabledBtn(reqItems, btn);
   }

   function _checkValidField(fields) {
      const fieldsArray = [...fields];
      return fieldsArray.every(item => item.classList.contains('_valid'));
   }

   function checkDisabledBtn(reqItems, btn) {
      if (reqItems.length) {
         const noValidField = [...reqItems].some(item => !item.classList.contains('choosen'));
         !noValidField ? btn.disabled = false : btn.disabled = true;
      }
   }
}