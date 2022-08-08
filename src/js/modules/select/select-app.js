import { Select } from './selectPlugin.js';

class CreateSelect extends Select {
   constructor(selector, options) {
      super(selector, options);
   }
   close() {
      super.close();
      if (this.selectedId) {
         this.$el.closest('.step-content-one__item').classList.add('choosen');
      }
      checkChoosenClass(this.$el.closest('.step-content-one__item'));
   }
}

function checkChoosenClass(item) {
   !item.classList.contains('choosen') ? item.classList.add('not-valid') : item.classList.remove('not-valid')
}

export const createSelect = new CreateSelect('[data-select]', {
   placeholder: 'Have my song added to radio playlists',
   // defaultId: '2',
   data: [
      { id: '1', value: 'Yes' },
      { id: '2', value: 'No' }
   ],
});

