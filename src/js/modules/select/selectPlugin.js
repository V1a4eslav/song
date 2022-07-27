const getTemplate = (data = [], placeholder, selectedId) => {
   let text = placeholder ?? 'You may choose items';

   const items = data.map(item => {
      let cls = '';
      if (item.id === selectedId) {
         text = item.value;
         cls = 'selected';
      }
      return `<p class="select-step-one__dropdown-item ${cls}" data-type="select-item" data-id="${item.id}">${item.value}</p>`
   })

   return `<div class="select-step-one__input" data-type="input">
      <span class="select-step-one__title notclicable" data-type="value">${text}</span>
      <div class="select-step-one__icon notclicable">
         <svg width="20" height="13" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
               d="M7.29289 8.70711C7.68342 9.09763 8.31658 9.09763 8.70711 8.70711L15.0711 2.34315C15.4616 1.95262 15.4616 1.31946 15.0711 0.928932C14.6805 0.538408 14.0474 0.538408 13.6569 0.928932L8 6.58579L2.34315 0.928932C1.95262 0.538408 1.31946 0.538408 0.928932 0.928932C0.538407 1.31946 0.538408 1.95262 0.928932 2.34315L7.29289 8.70711ZM7 7L7 8L9 8L9 7L7 7Z"
               fill="#55287D" />
         </svg>
      </div>
      </div>
      <div class="select-step-one__dropdown" data-type="select-drobdown">${items.join('')}</div>
   `
}

export class Select {
   constructor(selector, options) {
      this.$el = document.querySelector(selector);
      if (!this.$el) return;
      this.options = options;
      /*c помощью selectedId мы будем трекать какой
      текущий выбранный элемент у нас есть ,точнее его id*/
      this.selectedId = options.defaultId;

      this.#render();
      this.#setup();
   }

   #render() {
      const { placeholder, data } = this.options;
      this.$el.innerHTML = getTemplate(data, placeholder, this.selectedId);
   }

   #setup() {
      this.clickHandler = this.clickHandler.bind(this);
      this.close = this.close.bind(this);
      this.$el.addEventListener("click", this.clickHandler);
      if (this.isOpen) {
         this.$el.addEventListener("mouseleave", this.close);
      }
      this.$value = this.$el.querySelector("[data-type='value']");
   }

   /* Если мы захотим использовать контекст в методе clickHandler , 
   то мы не сможем воспользоваться этим так как мы передаем в слушатель ф-цию как ссылку
   а при этом теряется контекст,чтобы этого небыло нам надо ее забаиндить и 
   это сделаем в #setup:    this.clickHandler = this.clickHandler.bind(this);  */
   clickHandler(e) {
      const { type } = e.target.dataset
      if (type === 'input') {
         this.toggle();
      } else if (type === 'select-item') {
         const id = e.target.dataset.id;
         this.select(id);
      }

   }

   get isOpen() {
      return this.$el.classList.contains('open');
   }

   get current() {
      return this.options.data.find(item => item.id === this.selectedId);
   }

   select(id) {
      this.selectedId = id;
      this.$value.textContent = this.current.value;

      this.$el.querySelectorAll('[data-type="select-item"]').forEach(element => {
         element.classList.remove('selected');
      });

      this.$el.querySelector(`[data-id="${this.selectedId}"`).classList.add('selected');

      this.close();
   }

   toggle() {
      this.isOpen ? this.close() : this.open();
   }

   open() {
      this.$el.classList.add('open');
   }

   close() {
      this.$el.classList.remove('open');
   }

}