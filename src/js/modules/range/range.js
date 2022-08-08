export function range() {
   const range = document.getElementById('range');
   const rangeValue = document.querySelector('[data-type="range-value"]');
   const fast = document.querySelector('[data-fast]');
   const slow = document.querySelector('[data-slow]');
   const skip = document.querySelector('[data-skip]');
   if (range) {
      noUiSlider.create(range, {
         start: 187,
         connect: 'lower',
         range: {
            'min': 0,
            'max': 450
         }
      });

      function changeButtons(fast, slow) {
         if (fast && slow) {
            if (range.noUiSlider.getPositions() >= 50) {
               slow.classList.remove('active');
               fast.classList.add('active');
            } else {
               fast.classList.remove('active');
               slow.classList.add('active');
            }
         }
      }
      function addChoosenClass() {
         skip.closest('.step-content-one__item').classList.add('choosen');
         skip.classList.add('active');
      }

      function removeChoosenClass() {
         range.noUiSlider.reset()
         skip.closest('.step-content-one__item').classList.remove('choosen')
         skip.classList.remove('active');
      }

      if (skip) {
         skip.addEventListener("click", removeChoosenClass);
      }


      range.noUiSlider.on('update', function (values, handle) {
         if (rangeValue) {
            rangeValue.innerHTML = parseInt(values[handle]);
         }
         changeButtons(fast, slow);
      });

      range.noUiSlider.on('change', addChoosenClass);

      return range;
   }
}