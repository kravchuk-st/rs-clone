import Swiper from './swiper.min';

export const slider = new Swiper('.mySwiper', {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  loopFillGroupWithBlank: true,
  autoplay: {
    delay: 3500,
    stopOnLastSlide: false,
    disableOnInteraction: false,
  },
  breakpoints: {
    685: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
  },
  navigation: {
    nextEl: '.swiper__btn_next',
    prevEl: '.swiper__btn_prev',
  },
});
