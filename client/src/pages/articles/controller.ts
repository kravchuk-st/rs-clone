import { renderCards } from '../../features/renderCards';
import * as articlesService from '../../api/articlesService';
import { ILoadArticleCard } from '../../types';
import { articlesLoadConfigInit } from './config';
import { handleSaveFavoriteButtons } from '../../features/cardButtonsHandler';
import loadCardsContent from '../../features/loadCards';
import * as formHandler from '../../helpers/loginFormHandlers';

const userObject = JSON.parse(localStorage.getItem('user') || 'null');
const articlesLoadConfig = articlesLoadConfigInit;

async function loadArticlesPage(articlesLoadConfig: ILoadArticleCard) {
  const articlesData = await loadCardsContent(articlesLoadConfig, articlesService.getArticles);
  renderCards(articlesData, articlesLoadConfig, userObject);
}

function addListeners() {
  formHandler.addUserButtonListener();
  formHandler.addRegisterFormListener();
  formHandler.addSignInFormListener();
  addCategorySelectListener();
  addArticleButtonsListeners();
  addSearchInputListener();
}

function addCategorySelectListener() {
  const selectContainer = document.querySelector('.options-container') as HTMLDivElement;
  const categoryInputs = selectContainer.querySelectorAll('input[type="radio"]') as NodeListOf<HTMLInputElement>;
  for (const radioButton of categoryInputs) {
    radioButton.addEventListener('change', fetchArticles);
  }
}

async function fetchArticles(e: Event) {
  const categoryInput = e.target as HTMLInputElement;
  articlesLoadConfig.queryOptions.category = categoryInput.value.replaceAll('-', ' ');
  await loadArticlesPage(articlesLoadConfig);
  addArticleButtonsListeners();
}

function addArticleButtonsListeners() {
  const articles = document.querySelectorAll('.article');
  articles.forEach(article => {
    handleSaveFavoriteButtons(article, 'articles');
  });
}

function addSearchInputListener() {
  // const searchInput = document.querySelector('.search__input') as HTMLInputElement;
  // searchInput.addEventListener('change', (e: Event) => {
  //   const input = e.target as HTMLInputElement;
  // });
}

export { loadArticlesPage, addListeners };
