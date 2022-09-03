import { renderArticleCard } from '../main/render';
import * as articlesService from '../../api/articlesService';
import { ILoadArticleCard } from '../../types';
import { articlesLoadConfig } from './config';

async function loadArticlesPage() {
  await loadArticles(articlesLoadConfig);
}

function addListeners() {
  addCategorySelectListener();
  addArticleButtonsListeners();
  addSearchInputListener();
}

async function loadArticles(loadConfig: ILoadArticleCard) {
  const listContainer = document.querySelector(`.${loadConfig.listClass}`) as HTMLUListElement;

  const itemsData = await articlesService.getArticles(loadConfig.queryOptions);
  const itemsCards = itemsData.map(article => renderArticleCard(article, loadConfig.articleClassList));

  listContainer.innerHTML = '';
  listContainer.append(...itemsCards);
}

function addCategorySelectListener() {
  const selectContainer = document.querySelector('.options-container') as HTMLDivElement;
  const categoryInputs = selectContainer.querySelectorAll('input[type="radio"]') as NodeListOf<HTMLInputElement>;
  for (const radioButton of categoryInputs) {
    radioButton.addEventListener('change', fetchArticles);
  }

  function fetchArticles(e: Event) {
    const categoryInput = e.target as HTMLInputElement;
    const queryCategory = categoryInput.value.replaceAll('-', ' ');
    const loadConfig = articlesLoadConfig;
    loadConfig.queryOptions.category = queryCategory;
    loadArticles(loadConfig);
  }
}

function addArticleButtonsListeners() {
  const articles = document.querySelectorAll('.article');
  articles.forEach(article => {
    const saveButton = article.querySelector('.save-btn') as HTMLButtonElement;
    const favoriteButton = article.querySelector('.favorite-btn') as HTMLButtonElement;

    saveButton.addEventListener('click', (e: Event) => (e.target as HTMLButtonElement).classList.toggle('is-active'));
    favoriteButton.addEventListener('click', (e: Event) =>
      (e.target as HTMLButtonElement).classList.toggle('is-active')
    );
  });
}

function addSearchInputListener() {
  const searchInput = document.querySelector('.search__input') as HTMLInputElement;
  searchInput.addEventListener('change', (e: Event) => {
    const input = e.target as HTMLInputElement;
    console.log(input.value);
  });
}

export { loadArticlesPage, addListeners };