import axios from "axios";
import Swiper, { Navigation } from 'swiper';


export function createSlide() {
   async function getSongs() {
      const options = {
         method: 'GET',
         url: 'https://shazam.p.rapidapi.com/charts/track',
         params: { locale: 'en-US', pageSize: '20', startFrom: '0' },
         headers: {
            'X-RapidAPI-Host': 'shazam.p.rapidapi.com',
            'X-RapidAPI-Key': '3597d16b36mshe55491391228d0bp1a26e0jsn09c273ef7924'
         }
      };
      try {
         const { data } = await axios.request(options);
         return data;
      } catch (error) {
         console.error(error);
      };
   }

   async function renderItem() {
      const mainSliderWrapper = document.querySelector(".main-slider__wrapper");
      if (mainSliderWrapper) {
         const { tracks } = await getSongs();
         if (tracks.length > 0) {
            await tracks.forEach((item) => {
               mainSliderWrapper.appendChild(createItem(item));
            });
            const a = new Swiper(".main-slider__content", {
               modules: [Navigation],
               navigation: {
                  prevEl: ".slide-main-slider__prev.swiper-button-prev",
                  nextEl: ".slide-main-slider__next.swiper-button-next",
               },
               autoHeight: true,
            });
            a.on('slideChange', function () {
               console.log('slide changed');
            });
         }
      }
   }
   function createItem({ type, subtitle, title, hub: { actions: { 1: { uri } } } }) {
      const templateItemHtml = document.querySelector('#main-slider-slide').innerHTML.trim()
         .replace("{genre}", type)
         .replace("{musician}", subtitle)
         .replace("{title}", title)
         // .replace("{background}", background)
         .replace("{audio}", uri)
      return htmlToElement(templateItemHtml);
   }
   function htmlToElement(html) {
      const template = document.createElement('template');
      template.innerHTML = html;
      return template.content.firstChild;
   }
   renderItem()
}

