import loadCardsContent from '../../features/loadCards';
import * as recipesService from '../../api/recipesService';
import * as articlesService from '../../api/articlesService';
import { ILoadUserArticles, ILoadUserRecipes } from '../../types';

async function loadPageContent(recipesLoadConfig: ILoadUserRecipes, articlesLoadConfig: ILoadUserArticles) {
  const savedRecipes = await loadCardsContent(recipesLoadConfig.saved, recipesService.getRecipes);
  const favoriteRecipes = await loadCardsContent(recipesLoadConfig.favorite, recipesService.getRecipes);
  const savedArticles = await loadCardsContent(articlesLoadConfig.saved, articlesService.getArticles);
  const favoriteArticles = await loadCardsContent(articlesLoadConfig.favorite, articlesService.getArticles);
}

function addListeners() {
  addArticlesButtonListener();
  addRecipesButtonListener();
}

function addArticlesButtonListener() {
  const articlesButton = document.querySelector('#articles-btn') as HTMLButtonElement;
  const recipesButton = document.querySelector('#recipes-btn') as HTMLButtonElement;
  const articlesTab = document.querySelector('#tab-articles') as HTMLElement;
  const recipesTab = document.querySelector('#tab-recipes') as HTMLElement;

  articlesButton.addEventListener('click', (e: Event) => {
    articlesTab.classList.add('is-active');
    recipesTab.classList.remove('is-active');
    (e.target as HTMLButtonElement).classList.add('btn-active');
    (e.target as HTMLButtonElement).classList.remove('btn_outlined');
    recipesButton.classList.add('btn_outlined');
    recipesButton.classList.remove('btn-active');
  });
}

function addRecipesButtonListener() {
  const articlesButton = document.querySelector('#articles-btn') as HTMLButtonElement;
  const recipesButton = document.querySelector('#recipes-btn') as HTMLButtonElement;
  const articlesTab = document.querySelector('#tab-articles') as HTMLElement;
  const recipesTab = document.querySelector('#tab-recipes') as HTMLElement;

  recipesButton.addEventListener('click', (e: Event) => {
    articlesTab.classList.remove('is-active');
    recipesTab.classList.add('is-active');
    (e.target as HTMLButtonElement).classList.add('btn-active');
    (e.target as HTMLButtonElement).classList.remove('btn_outlined');
    articlesButton.classList.add('btn_outlined');
    articlesButton.classList.remove('btn-active');
  });
}

export { loadPageContent, addListeners };
