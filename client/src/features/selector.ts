const selectHandler = (): void => {
  const selected = document.querySelector('#selected');
  const optionsContainer = document.querySelector('.options-container');
  const optionsList = document.querySelectorAll('.option');
  selected?.addEventListener('click', () => {
    optionsContainer?.classList.toggle('is-active');
  });

  optionsList.forEach(opt => {
    opt.addEventListener('click', () => {
      if (selected) {
        selected.innerHTML = (opt.querySelector('label') as HTMLElement).innerHTML;
        optionsContainer?.classList.remove('is-active');
      }
    });
  });
};

export default selectHandler;
