import Swiper, { Navigation, Autoplay } from 'swiper';
export function servicesSlider() {
   const servicesSlider = document.querySelector('.services-slider__content');
   if (servicesSlider) {
      const servicesSlider = new Swiper('.services-slider__content', {
         modules: [Navigation, Autoplay],
         navigation: {
            prevEl: ".services-slider__btn-prev.swiper-button-prev",
            nextEl: ".services-slider__btn-next.swiper-button-next",
         },
         autoplay: {
            delay: 2000,
         },
         speed: 800,
         breakpoints: {
            // when window width is >= 320px
            320: {
               slidesPerView: 1,
            },
            480: {
               slidesPerView: 2,
            },
            767.98: {
               slidesPerView: 4,
            },
            1330: {
               slidesPerView: 5,
            }
         }
      });
      const activeSlide = document.querySelector('.services-slider__slide.swiper-slide-active');
      const text = activeSlide.querySelector('.services-slide__text').innerText;
      document.querySelector('.services-slider__label').innerText = text;
      servicesSlider.on('beforeTransitionStart', function () {
         const activeSlide = document.querySelector('.services-slider__slide.swiper-slide-active');
         const text = activeSlide.querySelector('.services-slide__text').innerText;
         const label = document.querySelector('.services-slider__label');
         label.innerText = text;
      });
   }
}
