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
            'X-RapidAPI-Key': '2482486450msh007a4a83c861c57p18d2f6jsn18435d945892'
         }
      };
      // try {
      //    const { data } = await axios.request(options);
      //    return data;
      // } catch (error) {
      //    console.error(error);
      // };
   }

   async function renderItem() {
      const arr = await getSongs();
      if (arr > 0) {
         await arr.tracks.forEach(item => {
            document.querySelector('.main-slider__wrapper').appendChild(createItem(item));
         });
         new Swiper('.main-slider__content', {
            modules: [Navigation],
            navigation: {
               prevEl: '.slide-main-slider__prev.swiper-button-prev',
               nextEl: '.slide-main-slider__next.swiper-button-next',
            },
            autoHeight: true,
         })
      }
   }
   function createItem({ type, subtitle, title }) {
      const templateItemHtml = document.querySelector('#main-slider-slide').innerHTML.trim()
         .replace("{genre}", type)
         .replace("{musician}", subtitle)
         .replace("{title}", title)
      // .replace("{background}", background)
      // .replace("{audio}", url)
      return htmlToElement(templateItemHtml);
   }
   function htmlToElement(html) {
      const template = document.createElement('template');
      template.innerHTML = html;
      return template.content.firstChild;
   }
   renderItem()
}

