import axios from "axios";
import { DOM } from "../variables.js";
import Swiper, { Navigation } from 'swiper';
import { htmlToElement } from './functions.js';


export function createSlide() {
   async function getSongs() {
      const options = {
         method: 'GET',
         url: 'https://shazam.p.rapidapi.com/charts/track',
         params: { locale: 'en-US', pageSize: '20', startFrom: '0' },
         headers: {
            'X-RapidAPI-Host': 'shazam.p.rapidapi.com',
            'X-RapidAPI-Key': '675be7cceamshd176963fa81353dp1930d6jsne45abd4657be'
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
      if (DOM.mainSliderWrapper) {
         const { tracks } = await getSongs();
         if (tracks.length > 0) {
            await tracks.forEach((item) => {
               DOM.mainSliderWrapper.appendChild(createItem(item));
            });
            new Swiper(".main-slider__content", {
               modules: [Navigation],
               navigation: {
                  prevEl: ".slide-main-slider__prev.swiper-button-prev",
                  nextEl: ".slide-main-slider__next.swiper-button-next",
               },
               autoHeight: true,
            });
            const slides = document.querySelectorAll('.slide-main-slider');
            const audioArr = document.querySelectorAll('.sound');
            const btns = document.querySelectorAll('.slide-main-slider__play');

            if (slides.length > 0) {
               DOM.mainSliderWrapper.addEventListener("click", getCurrentItems);
            }

            function getCurrentItems(e) {
               const currentBtn = document.querySelector('.swiper-slide-active .slide-main-slider__play');
               const currentAudio = document.querySelector('.swiper-slide-active audio');
               if (e.target.classList.contains('slide-main-slider__play') || e.target.closest('.slide-main-slider__play')) {
                  playAudioOnMainSlider(currentBtn, currentAudio, audioArr, btns);
               }
            }
         }
      }
   }


   function playAudioOnMainSlider(currentBtn, currentAudio, audioArray, btnsPlay) {
      if (!currentBtn.classList.contains('play')) {
         removeAllClassPlay(btnsPlay);
         pausedAudio(audioArray);
         currentBtn.classList.add('play');
         currentAudio.play();
      } else {
         removeAllClassPlay(btnsPlay);
         pausedAudio(audioArray)
      }
   }

   function removeAllClassPlay(btns) {
      btns.forEach(btn => {
         if (btn.classList.contains('play')) {
            btn.classList.remove('play');
         }
      });
   }

   function pausedAudio(audioArr) {
      audioArr.forEach(audio => {
         audio.pause();
         audio.currentTime = 0;
      });
   }

   function createItem({ type, subtitle, title, hub: { actions: { 1: { uri } } } }) {
      const templateItemHtml = document.querySelector('#main-slider-slide').innerHTML.trim()
         .replace("{genre}", type)
         .replace("{musician}", subtitle)
         .replace("{title}", title)
         .replace("{audio}", uri)
      return htmlToElement(templateItemHtml);
   }
   renderItem()
}
