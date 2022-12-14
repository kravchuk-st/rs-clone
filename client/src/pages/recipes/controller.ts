import { resetRangeFilters } from '../../features/range-filters';
import { recipesLoadConfigInit } from './config';
import loadCardsContent from '../../features/loadCards';
import * as recipesService from '../../api/recipesService';
import * as formHandler from '../../helpers/loginFormHandlers';
import { renderCards } from '../../features/renderCards';
import { handleSaveFavoriteButtons } from '../../features/cardButtonsHandler';
import { ILoadRecipeCard, IRecipeQueryOptions, SortOptions } from '../../types';
import * as noUiSlider from 'nouislider';

const userObject = JSON.parse(localStorage.getItem('user') || 'null');
const recipesLoadConfig = { ...recipesLoadConfigInit };
const configInit = JSON.parse(JSON.stringify(recipesLoadConfigInit));

async function loadRecipesPage(recipesLoadConfig: ILoadRecipeCard) {
  const recipesData = await loadCardsContent(recipesLoadConfig, recipesService.getRecipes);
  renderCards(recipesData, recipesLoadConfig, userObject);
}

function addListeners() {
  addFiltersEventListeners();
  addSortSelectListener();
  addRecipeButtonsListeners();
  addCheckboxFiltersListeners();
  addRangeFilterListeners();
  formHandler.addUserButtonListener();
  formHandler.addRegisterFormListener();
  formHandler.addSignInFormListener();
  addSearchListener();
  addResetFiltersListener();
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
    filtersBlock.classList.contains('filters_open') ? disableScroll() : enableScroll();
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
    enableScroll();
  }
}

function addSortSelectListener() {
  const selectContainer = document.querySelector('.options-container') as HTMLDivElement;
  const sortInputs = selectContainer.querySelectorAll('input[type="radio"]') as NodeListOf<HTMLInputElement>;
  for (const radioButton of sortInputs) {
    radioButton.addEventListener('change', fetchRecipes);
  }
}

async function fetchRecipes(e: Event) {
  const sortInput = e.target as HTMLInputElement;
  recipesLoadConfig.queryOptions.sort = sortInput.value as SortOptions;
  recipesLoadConfig.queryOptions['sort-dir'] = recipesLoadConfig.queryOptions.sort === 'price' ? 1 : -1;
  await loadRecipesPage(recipesLoadConfig);
  addRecipeButtonsListeners();
}

function addRecipeButtonsListeners() {
  const recipes = document.querySelectorAll('.card');
  recipes.forEach(recipe => {
    handleSaveFavoriteButtons(recipe, 'recipes');
  });
}

function addCheckboxFiltersListeners() {
  addGeneralCheckboxContainerListener();
  const dishTypesCheckboxContainer = document.getElementById('dishTypes') as HTMLLIElement;
  const cuisinesCheckboxContainer = document.getElementById('cuisines') as HTMLLIElement;
  const dietsCheckboxContainer = document.getElementById('diets') as HTMLLIElement;
  addListCheckboxContainerListener(dishTypesCheckboxContainer, 'dish-types');
  addListCheckboxContainerListener(cuisinesCheckboxContainer, 'cuisines');
  addListCheckboxContainerListener(dietsCheckboxContainer, 'diets');
}

function addGeneralCheckboxContainerListener() {
  const generalCheckboxContainer = document.getElementById('general') as HTMLLIElement;
  generalCheckboxContainer.addEventListener('change', async (e: Event) => {
    const firedInput = e.target as HTMLInputElement;
    const changedValue = firedInput.value as keyof IRecipeQueryOptions;
    const isChecked = firedInput.checked;
    if (isChecked) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      recipesLoadConfig.queryOptions[changedValue] = true;
    } else {
      delete recipesLoadConfig.queryOptions[changedValue];
    }
    await loadRecipesPage(recipesLoadConfig);
    addRecipeButtonsListeners();
  });
}

function addListCheckboxContainerListener(
  checkboxContainer: HTMLLIElement,
  propertyName: 'dish-types' | 'cuisines' | 'diets'
) {
  checkboxContainer.addEventListener('change', async (e: Event) => {
    const firedInput = e.target as HTMLInputElement;
    const checkboxValue = firedInput.value;
    const isChecked = firedInput.checked;
    if (isChecked) {
      if (!recipesLoadConfig.queryOptions[propertyName]) recipesLoadConfig.queryOptions[propertyName] = [];
      recipesLoadConfig.queryOptions[propertyName]?.push(checkboxValue);
    } else {
      recipesLoadConfig.queryOptions[propertyName] = recipesLoadConfig.queryOptions[propertyName]?.filter(
        listValue => listValue !== checkboxValue
      );
      if (!recipesLoadConfig.queryOptions[propertyName]?.length) delete recipesLoadConfig.queryOptions[propertyName];
    }
    await loadRecipesPage(recipesLoadConfig);
    addRecipeButtonsListeners();
  });
}

function addRangeFilterListeners() {
  const healthScoreRangeFilter = document.getElementById('health-score') as noUiSlider.target;
  const maxReadyTimeFilter = document.getElementById('max-ready-time') as noUiSlider.target;
  const priceFilter = document.getElementById('price') as noUiSlider.target;
  const caloriesFilter = document.getElementById('calories') as noUiSlider.target;
  const carbohydratesFilter = document.getElementById('carbohydrates') as noUiSlider.target;
  const fatsFilter = document.getElementById('fats') as noUiSlider.target;
  const proteinsFilter = document.getElementById('proteins') as noUiSlider.target;

  healthScoreRangeFilter.noUiSlider?.on('change', async values => {
    recipesLoadConfig.queryOptions['min-health-score'] = +Number.parseInt(values[0] as string, 10).toFixed(0);
    await loadRecipesPage(recipesLoadConfig);
    addRecipeButtonsListeners();
  });

  maxReadyTimeFilter.noUiSlider?.on('change', async values => {
    recipesLoadConfig.queryOptions['max-ready'] = +Number.parseInt(values[0] as string, 10).toFixed(0);
    await loadRecipesPage(recipesLoadConfig);
    addRecipeButtonsListeners();
  });

  priceFilter.noUiSlider?.on('change', async values => {
    const priceMin = 0;
    const priceMax = +Number.parseInt(values[0] as string, 10).toFixed(0);
    recipesLoadConfig.queryOptions['serving-price'] = [priceMin, priceMax];
    await loadRecipesPage(recipesLoadConfig);
    addRecipeButtonsListeners();
  });

  caloriesFilter.noUiSlider?.on('change', async values => {
    recipesLoadConfig.queryOptions['max-calories'] = +Number.parseInt(values[0] as string, 10).toFixed(0);
    await loadRecipesPage(recipesLoadConfig);
    addRecipeButtonsListeners();
  });

  carbohydratesFilter.noUiSlider?.on('change', async values => {
    recipesLoadConfig.queryOptions['max-carbs'] = +Number.parseInt(values[0] as string, 10).toFixed(0);
    await loadRecipesPage(recipesLoadConfig);
    addRecipeButtonsListeners();
  });

  fatsFilter.noUiSlider?.on('change', async values => {
    recipesLoadConfig.queryOptions['max-fats'] = +Number.parseInt(values[0] as string, 10).toFixed(0);
    await loadRecipesPage(recipesLoadConfig);
    addRecipeButtonsListeners();
  });

  proteinsFilter.noUiSlider?.on('change', async values => {
    recipesLoadConfig.queryOptions['max-proteins'] = +Number.parseInt(values[0] as string, 10).toFixed(0);
    await loadRecipesPage(recipesLoadConfig);
    addRecipeButtonsListeners();
  });
}

function addSearchListener() {
  const searchInput = document.querySelector('.search__input') as HTMLInputElement;
  searchInput.addEventListener('change', async (e: Event) => {
    recipesLoadConfig.queryOptions.search = (e.target as HTMLInputElement).value.split(' ');
    await loadRecipesPage(recipesLoadConfig);
    addRecipeButtonsListeners();
  });
}

function addResetFiltersListener() {
  const resetButton = document.querySelector('.filters__btn_reset') as HTMLButtonElement;
  resetButton.addEventListener('click', async () => {
    await loadRecipesPage(configInit);
    addRecipeButtonsListeners();
  });
}

function disableScroll() {
  document.body.style.overflow = 'hidden';
  document.body.style.userSelect = 'none';
}

function enableScroll() {
  document.body.style.overflow = 'auto';
  document.body.style.userSelect = 'auto';
}

export { loadRecipesPage, addListeners };
