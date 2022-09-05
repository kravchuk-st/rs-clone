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
import userpageControlsHandler from '../../features/userpageButtonHandlers';

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
  const emptyRecipesSaved = document.querySelector('#empty-recipes-saved') as HTMLElement;
  const emptyRecipesFavorite = document.querySelector('#empty-recipes-favorite') as HTMLElement;
  const emptyArticlesSaved = document.querySelector('#empty-articles-saved') as HTMLElement;
  const emptyArticlesFavorite = document.querySelector('#empty-articles-favorite') as HTMLElement;

  if (recipesLoadConfig.saved.queryOptions.id?.length) {
    const savedRecipes = await loadCardsContent(recipesLoadConfig.saved, recipesService.getRecipes);
    renderCards(savedRecipes, recipesLoadConfig.saved);
    emptyRecipesSaved.classList.add('hidden');
  } else {
    emptyRecipesSaved.classList.remove('hidden');
  }

  if (recipesLoadConfig.favorite.queryOptions.id?.length) {
    const favoriteRecipes = await loadCardsContent(recipesLoadConfig.favorite, recipesService.getRecipes);
    renderCards(favoriteRecipes, recipesLoadConfig.favorite);
    emptyRecipesFavorite.classList.add('hidden');
  } else {
    emptyRecipesFavorite.classList.remove('hidden');
  }

  if (articlesLoadConfig.saved.queryOptions.id?.length) {
    const savedArticles = await loadCardsContent(articlesLoadConfig.saved, articlesService.getArticles);
    renderCards(savedArticles, articlesLoadConfig.saved);
    emptyArticlesSaved.classList.add('hidden');
  } else {
    emptyArticlesSaved.classList.remove('hidden');
  }

  if (articlesLoadConfig.favorite.queryOptions.id?.length) {
    const favoriteArticles = await loadCardsContent(articlesLoadConfig.favorite, articlesService.getArticles);
    renderCards(favoriteArticles, articlesLoadConfig.favorite);
    emptyArticlesFavorite.classList.add('hidden');
  } else {
    emptyArticlesFavorite.classList.remove('hidden');
  }
}

const logoutButton = document.getElementById('logout-btn') as HTMLElement;

function addListeners() {
  userpageControlsHandler();
  addLogoutButtonListener();
}
function addLogoutButtonListener() {
  logoutButton.addEventListener('click', () => logOut());
}

export { fetchUserData, createQueryConfigs, loadPageContent, addListeners };
