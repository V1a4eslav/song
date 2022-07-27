import { DOM } from "./variables.js";
import { burgerFuntions } from './modules/burger.js';
import { forms } from './modules/forms.js';
import * as functions from './modules/functions.js';
import * as scrollAnimation from './modules/scrollAnimation.js';
import * as spoller from './modules/spollers.js';
import * as slide from './modules/createSlideForMainSlider.js';
import * as services from './modules/services-slider.js';
import './modules/modal/modalIndex.js';
import './modules/tabs/tabsIndex.js';
// add modul noUiSlider
import './modules/range/nouislider.min.js';
import { range } from './modules/range/range.js';
// =======================
import './modules/select/select-app.js';
import './modules/stepForm.js';
import './modules/bankCard/bankCard-Index.js'


DOM.iconMenu.addEventListener("click", burgerFuntions);

functions.isWebp();
forms();
scrollAnimation.scrollAnimation();
spoller.spollers();
// slide.createSlide()
services.servicesSlider();
range();























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