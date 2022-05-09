import * as functions from './modules/functions.js';
import * as forms from './modules/forms.js';
import * as scrollAnimation from './modules/scrollAnimation.js';
import * as spoller from './modules/spollers.js';
import * as home from './home/variables.js';
import * as slide from './home/templates/templatesForHtml.js';


functions.isWebp();
scrollAnimation.scrollAnimation();
spoller.spollers();
// slide.createSlide()

home.iconMenu.addEventListener("click", burgerFuntions);

function burgerFuntions(e) {
   if (home.iconMenu && e.target.closest('.icon-menu')) {
      this.classList.toggle('menu-open')
      document.body.classList.toggle('lock')
      if (this.classList.contains('menu-open')) {
         home.headerNav.classList.add('open')
      } else {
         home.headerNav.classList.remove('open')
      }
   }
}


















// import axios from "axios";
// const options = {
//    method: 'GET',
//    url: 'https://shazam.p.rapidapi.com/search',
//    params: { term: 'kiss the rain', locale: 'en-US', offset: '0', limit: '5' },
//    headers: {
//       'X-RapidAPI-Host': 'shazam.p.rapidapi.com',
//       'X-RapidAPI-Key': '2482486450msh007a4a83c861c57p18d2f6jsn18435d945892'
//    }
// };

// axios.request(options).then(function (response) {
//    console.log(response.data);
// }).catch(function (error) {
//    console.error(error);
// });