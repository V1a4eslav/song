import axios from "axios";
export function createSlide() {
   async function getSongs() {
      const options = {
         method: 'GET',
         url: 'https://shazam.p.rapidapi.com/songs/list-artist-top-tracks',
         params: { id: '40008598', locale: 'en-US' },
         headers: {
            'X-RapidAPI-Host': 'shazam.p.rapidapi.com',
            'X-RapidAPI-Key': '2482486450msh007a4a83c861c57p18d2f6jsn18435d945892'
         }
      }
      try {
         const { data } = await axios.request(options);
         return data;
      } catch (error) {
         console.error(error);
      };
   }

   async function renderItem() {
      const arr = await getSongs();
      await arr.tracks.forEach(item => {
         let boxItems = document.querySelector('.main-slider__wrapper').appendChild(createItem(item));
      });
   }
   function createItem({ type, subtitle, title, images: { background } }) {
      const templateItemHtml = document.querySelector('#main-slider-slide').innerHTML.trim()
         .replace("{genre}", type)
         .replace("{musician}", subtitle)
         .replace("{title}", title)
         .replace("{background}", background)
      return htmlToElement(templateItemHtml);
   }
   function htmlToElement(html) {
      const template = document.createElement('template');
      template.innerHTML = html;
      return template.content.firstChild;
   }
   renderItem()
}
