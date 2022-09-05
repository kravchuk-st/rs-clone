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
import * as userService from '../../api/userService';
import { ENDPOINTS } from '../../config/api.config';
import userpageControlsHandler from '../../features/userpageButtonHandlers';
import * as formHandler from '../../helpers/loginFormHandlers';

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
          listElemType: 'li',
          cardClassList: ['recipe__item'],
          queryOptions: initRecipesSavedQueryOptions,
          largeCardIndex: -1,
        },
        favorite: {
          containerClass: 'recipes-favorite',
          listClass: 'recipes__list',
          listElemType: 'li',
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
  const userObject = JSON.parse(localStorage.getItem('user') || 'null');

  await renderLoadedSections(userObject, recipesLoadConfig, articlesLoadConfig);
}

function addListeners() {
  userpageControlsHandler();
  addLogoutButtonListener();
  addArticleButtonsListeners();
  addRecipeButtonsListeners();
  formHandler.addUserButtonListener();
  formHandler.addRegisterFormListener();
  formHandler.addSignInFormListener();
}

const logoutButton = document.getElementById('logout-btn') as HTMLElement;

function addLogoutButtonListener() {
  logoutButton.addEventListener('click', () => logOut());
}

function addArticleButtonsListeners() {
  const articles = document.querySelectorAll('.article');
  articles.forEach(article => {
    handleSaveFavoriteButtonsUser(article, 'articles');
  });
}

function addRecipeButtonsListeners() {
  const recipes = document.querySelectorAll('.card');
  recipes.forEach(recipe => {
    handleSaveFavoriteButtonsUser(recipe, 'recipes');
  });
}

function handleSaveFavoriteButtonsUser(cardElement: Element, cardCategory: 'articles' | 'recipes') {
  const saveButton = cardElement.querySelector('.save-btn') as HTMLButtonElement;
  const favoriteButton = cardElement.querySelector('.favorite-btn') as HTMLButtonElement;

  saveButton.addEventListener('click', (e: Event) => {
    const targetButton = e.target as HTMLButtonElement;
    targetButton.classList.toggle('is-active');
    const userObject = JSON.parse(localStorage.getItem('user') as string);
    updateUserResources(userObject, cardElement, targetButton, cardCategory, 'saved');
  });

  favoriteButton.addEventListener('click', (e: Event) => {
    const targetButton = e.target as HTMLButtonElement;
    targetButton.classList.toggle('is-active');
    const userObject = JSON.parse(localStorage.getItem('user') as string);
    updateUserResources(userObject, cardElement, targetButton, cardCategory, 'favorite');
  });
}

async function updateUserResources(
  userObject: IUserResponse,
  cardElement: Element,
  eventTarget: HTMLButtonElement,
  cardName: 'articles' | 'recipes',
  cardCategory: 'saved' | 'favorite'
) {
  if (eventTarget.classList.contains('is-active')) {
    userObject[cardName][cardCategory].push(cardElement.id);
  } else {
    userObject[cardName][cardCategory] = userObject[cardName][cardCategory].filter(
      resourceId => resourceId !== cardElement.id
    );
  }
  userService.sendUserData(userObject, ENDPOINTS.userUpdate);
  localStorage.setItem('user', JSON.stringify(userObject));
  clearTabsContent();
  await rerenderUserItems(userObject);
  addArticleButtonsListeners();
  addRecipeButtonsListeners();
}

function clearTabsContent() {
  const recipesList = document.querySelectorAll('.recipes__list') as NodeListOf<HTMLElement>;
  const articlesList = document.querySelectorAll('.articles__list') as NodeListOf<HTMLElement>;
  recipesList.forEach(container => (container.innerHTML = ''));
  articlesList.forEach(container => (container.innerHTML = ''));
}

async function rerenderUserItems(userObject: IUserResponse) {
  const configs = createQueryConfigs(userObject) as (ILoadUserRecipes | ILoadUserArticles)[];
  const recipesLoadConfig = configs[0] as ILoadUserRecipes;
  const articlesLoadConfig = configs[1] as ILoadUserArticles;

  await renderLoadedSections(userObject, recipesLoadConfig, articlesLoadConfig);
}

async function renderLoadedSections(
  userObject: IUserResponse | null,
  recipesLoadConfig: ILoadUserRecipes,
  articlesLoadConfig: ILoadUserArticles
) {
  const emptyRecipesSaved = document.querySelector('#empty-recipes-saved') as HTMLElement;
  const emptyRecipesFavorite = document.querySelector('#empty-recipes-favorite') as HTMLElement;
  const emptyArticlesSaved = document.querySelector('#empty-articles-saved') as HTMLElement;
  const emptyArticlesFavorite = document.querySelector('#empty-articles-favorite') as HTMLElement;

  if (recipesLoadConfig.saved.queryOptions.id?.length) {
    const savedRecipes = await loadCardsContent(recipesLoadConfig.saved, recipesService.getRecipes);
    renderCards(savedRecipes, recipesLoadConfig.saved, userObject);
    emptyRecipesSaved.classList.add('hidden');
  } else {
    emptyRecipesSaved.classList.remove('hidden');
  }

  if (recipesLoadConfig.favorite.queryOptions.id?.length) {
    const favoriteRecipes = await loadCardsContent(recipesLoadConfig.favorite, recipesService.getRecipes);
    renderCards(favoriteRecipes, recipesLoadConfig.favorite, userObject);
    emptyRecipesFavorite.classList.add('hidden');
  } else {
    emptyRecipesFavorite.classList.remove('hidden');
  }

  if (articlesLoadConfig.saved.queryOptions.id?.length) {
    const savedArticles = await loadCardsContent(articlesLoadConfig.saved, articlesService.getArticles);
    renderCards(savedArticles, articlesLoadConfig.saved, userObject);
    emptyArticlesSaved.classList.add('hidden');
  } else {
    emptyArticlesSaved.classList.remove('hidden');
  }

  if (articlesLoadConfig.favorite.queryOptions.id?.length) {
    const favoriteArticles = await loadCardsContent(articlesLoadConfig.favorite, articlesService.getArticles);
    renderCards(favoriteArticles, articlesLoadConfig.favorite, userObject);
    emptyArticlesFavorite.classList.add('hidden');
  } else {
    emptyArticlesFavorite.classList.remove('hidden');
  }
}

export { fetchUserData, createQueryConfigs, loadPageContent, addListeners };
