import { resetRangeFilters } from '../../features/range-filters';

const filtersBtn = document.querySelector('.filters-btn') as HTMLButtonElement;
const filtersShowBtn = document.querySelector('.filters__btn_show') as HTMLButtonElement;
const filtersResetBtn = document.querySelector('.filters__btn_reset') as HTMLButtonElement;
const filtersBlock = document.querySelector('.filters') as HTMLDivElement;
const filtersBg = document.querySelector('.filters__bg') as HTMLDivElement;
const filtersCheckboxes = [...document.querySelectorAll('input[type=checkbox]')] as HTMLInputElement[];

function addFiltersEventListeners() {
  filtersBtn.addEventListener('click', () => {
    filtersBlock.classList.toggle('filters_open');
  });

  filtersBg.addEventListener('click', closeFilters);
  filtersShowBtn.addEventListener('click', closeFilters);
  filtersResetBtn.addEventListener('click', () => {
    closeFilters();
    filtersCheckboxes.forEach(el => {
      el.checked = false;
    });
    resetRangeFilters();
  });

  function closeFilters() {
    filtersBlock.classList.remove('filters_open');
  }
}

export { addFiltersEventListeners };
