import Swiper from './swiper.min';

export const slider = new Swiper('.mySwiper', {
  slidesPerView: 3,
  spaceBetween: 40,
  loop: true,
  loopFillGroupWithBlank: true,
  autoplay: {
    delay: 3500,
    stopOnLastSlide: false,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: '.swiper__btn_next',
    prevEl: '.swiper__btn_prev',
  },
});
