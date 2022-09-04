import loadCardsContent from '../../features/loadCards';
import * as recipesService from '../../api/recipesService';
import * as articlesService from '../../api/articlesService';
import {
  IArticleQueryOptions,
  ILoadUserArticles,
  ILoadUserRecipes,
  IRecipeQueryOptions,
  IUserResponse,
} from '../../types';
import { renderCards } from '../../features/renderCards';
import { getUserData, logOut } from '../../api/userService';

async function fetchUserData(): Promise<IUserResponse | undefined> {
  return await getUserData();
}

function createQueryConfigs(userData: IUserResponse | undefined): (ILoadUserRecipes | ILoadUserArticles)[] | undefined {
  if (userData !== undefined) {
    const initRecipesSavedQueryOptions: IRecipeQueryOptions = {
      page: 0,
      limit: 10,
      id: userData.recipes.saved,
    };

    const initRecipesFavoriteQueryOptions: IRecipeQueryOptions = {
      page: 0,
      limit: 10,
      id: userData.recipes.favorite,
    };

    const initArticlesSavedQueryOptions: IArticleQueryOptions = {
      page: 0,
      limit: 8,
      id: userData.articles.saved,
    };

    const initArticlesFavoriteQueryOptions: IArticleQueryOptions = {
      page: 0,
      limit: 8,
      id: userData.articles.favorite,
    };

    const recipesLoadConfig: ILoadUserRecipes[] = [
      {
        saved: {
          containerClass: 'recipes-saved',
          listClass: 'recipes__list',
          listElemType: 'a',
          cardClassList: ['recipe__item'],
          queryOptions: initRecipesSavedQueryOptions,
          largeCardIndex: -1,
        },
        favorite: {
          containerClass: 'recipes-favorite',
          listClass: 'recipes__list',
          listElemType: 'a',
          cardClassList: ['recipe__item'],
          queryOptions: initRecipesFavoriteQueryOptions,
          largeCardIndex: -1,
        },
      },
    ];

    const articlesLoadConfig: ILoadUserArticles[] = [
      {
        saved: {
          containerClass: 'articles-saved',
          listClass: 'articles__list',
          articleClassList: ['article'],
          queryOptions: initArticlesSavedQueryOptions,
        },
        favorite: {
          containerClass: 'articles-favorite',
          listClass: 'articles__list',
          articleClassList: ['article'],
          queryOptions: initArticlesFavoriteQueryOptions,
        },
      },
    ];

    return [...recipesLoadConfig, ...articlesLoadConfig];
  }
}

async function loadPageContent(recipesLoadConfig: ILoadUserRecipes, articlesLoadConfig: ILoadUserArticles) {
  const savedRecipes = await loadCardsContent(recipesLoadConfig.saved, recipesService.getRecipes);
  renderCards(savedRecipes, recipesLoadConfig.saved);

  const favoriteRecipes = await loadCardsContent(recipesLoadConfig.favorite, recipesService.getRecipes);
  renderCards(favoriteRecipes, recipesLoadConfig.favorite);

  const savedArticles = await loadCardsContent(articlesLoadConfig.saved, articlesService.getArticles);
  renderCards(savedArticles, articlesLoadConfig.saved);

  const favoriteArticles = await loadCardsContent(articlesLoadConfig.favorite, articlesService.getArticles);
  renderCards(favoriteArticles, articlesLoadConfig.favorite);
}

function addListeners() {
  addArticlesButtonListener();
  addRecipesButtonListener();
  addLogoutButtonListener();
}

const articlesButton = document.querySelector('#articles-btn') as HTMLButtonElement;
const recipesButton = document.querySelector('#recipes-btn') as HTMLButtonElement;
const articlesTab = document.querySelector('#tab-articles') as HTMLElement;
const recipesTab = document.querySelector('#tab-recipes') as HTMLElement;
const logoutButton = document.querySelector('#logout-btn') as HTMLButtonElement;

function addArticlesButtonListener() {
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
  recipesButton.addEventListener('click', (e: Event) => {
    articlesTab.classList.remove('is-active');
    recipesTab.classList.add('is-active');
    (e.target as HTMLButtonElement).classList.add('btn-active');
    (e.target as HTMLButtonElement).classList.remove('btn_outlined');
    articlesButton.classList.add('btn_outlined');
    articlesButton.classList.remove('btn-active');
  });
}

function addLogoutButtonListener() {
  logoutButton.addEventListener('click', () => logOut());
}

export { fetchUserData, createQueryConfigs, loadPageContent, addListeners };
