const burgerBtn = document.querySelector('.burger') as HTMLElement;
const menu = document.querySelector('.navbar__list') as HTMLElement;
const menuLinks = [...document.querySelectorAll('.nav__link')] as HTMLElement[];

export const burgerMenu = () => {
  burgerBtn.addEventListener('click', () => {
    burgerBtn.classList.toggle('burger_open');
    menu.classList.toggle('navbar__list_open');
  });

  menuLinks.forEach((el: HTMLElement) => {
    el.addEventListener('click', () => {
      burgerBtn.classList.remove('burger_open');
      menu.classList.remove('navbar__list_open');
    });
  });
};
