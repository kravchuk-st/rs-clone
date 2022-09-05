import { resetRangeFilters } from '../../features/range-filters';
import { recipesLoadConfig } from './config';
import loadCardsContent from '../../features/loadCards';
import * as recipesService from '../../api/recipesService';
import * as formHandler from '../../helpers/loginFormHandlers';

const userObject = JSON.parse(localStorage.getItem('user') || 'null');

async function loadRecipesPage() {
  await loadCardsContent(recipesLoadConfig, recipesService.getRecipes);
}

function addListeners() {
  addFiltersEventListeners();
  formHandler.addUserButtonListener();
  formHandler.addRegisterFormListener();
  formHandler.addSignInFormListener();
}

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

export { loadRecipesPage, addListeners };
