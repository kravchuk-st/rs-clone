const popupHandler = () => {
  const underlayer = document.querySelector('.popup__body');
  underlayer?.addEventListener('click', closeParentPopup);
};

const closeParentPopup = (e: Event) => {
  if (e.target instanceof HTMLElement && !e.target?.closest('.popup__content')) {
    e.target.closest('.popup')?.classList.remove('is-open');
  }
};

export default popupHandler;
