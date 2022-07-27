function stepsForm() {
   //    const stepForms = document.querySelectorAll('[data-step="form"]');
   //    if (stepForms.length > 0) {
   //       stepForms.forEach(form => {
   //          const stepItemsReq = form.querySelectorAll('[data-stepItem="req"]');
   //          if (stepItemsReq.length === 0) return;
   //          stepItemsReq.forEach(item => {
   //             const dataCheck = item.querySelectorAll('[data-check]');
   //             if (dataCheck.length === 0) return;
   //             dataCheck.forEach(dataCheck => {
   //                if (dataCheck.getAttribute('data-check') === 'checkbox') {
   //                   dataCheck.addEventListener("change", () => {
   //                      check(dataCheck);
   //                      checkChoosenClass(item);
   //                   });

   //                }
   //             });
   //          });


   //          const submitNext = form.querySelector('[data-btn="next"]');
   //          submitNext.addEventListener("click", function (e) {
   //             stepItemsReq.forEach(item => {
   //                checkChoosenClass(item)
   //             });
   //          });
   //       });
   //    }

   //    function check(elem) {
   //       const check = elem.getAttribute('data-check');
   //       if (check === 'checkbox') {
   //          const checkList = elem.closest('[data-stepItem="req"]').querySelectorAll('[data-check="checkbox"]');
   //          const isChecked = [...checkList].some(checkbox => checkbox.checked);
   //          isChecked ? elem.closest('[data-stepItem="req"]').classList.add('choosen') : elem.closest('[data-stepItem="req"]').classList.remove('choosen');
   //       }
   //    }
   // }
}


export function checkChoosenClass(item) {
   !item.classList.contains('choosen') ? item.classList.add('not-valid') : item.classList.remove('not-valid')
}

export function checkDisabledBtn(reqItems, btn) {
   const noValidField = [...reqItems].some(item => !item.classList.contains('choosen'));
   !noValidField ? btn.disabled = false : '';
}

stepsForm();
