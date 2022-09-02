import { DOM } from "./variables.js";
import { burgerFuntions } from './modules/burger.js';
import { forms } from './modules/forms.js';
import * as functions from './modules/functions.js';
import * as scrollAnimation from './modules/scrollAnimation.js';
import * as spoller from './modules/spollers.js';
import * as slide from './modules/createSlideForMainSlider.js';
import * as services from './modules/services-slider.js';
import { modalAuth } from './modules/modal/modalIndex.js';
import './modules/tabs/tabsIndex.js';
import { stepsForm } from './modules/stepForm.js';
import './modules/bankCard/bankCard-Index.js';
import { qr } from './modules/qr.js';
import { bitcoin } from './modules/bitcoin.js';


DOM.iconMenu.addEventListener("click", burgerFuntions);

functions.isWebp();
forms();
scrollAnimation.scrollAnimation();
spoller.spollers();
slide.createSlide();
modalAuth();
services.servicesSlider();
stepsForm();
qr();
bitcoin();






















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