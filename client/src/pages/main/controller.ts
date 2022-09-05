import loadCardsContent from '../../features/loadCards';
import * as recipesService from '../../api/recipesService';
import * as articlesService from '../../api/articlesService';
import * as userService from '../../api/userService';
import * as formHandler from '../../helpers/loginFormHandlers';

import { recipesLoadConfig, articlesLoadConfig } from './config';
import { renderCards } from '../../features/renderCards';
import { IUserResponse } from '../../types';
import { ENDPOINTS } from '../../config/api.config';

async function loadMainPageContent() {
  const popularRecipes = await loadCardsContent(recipesLoadConfig.popular, recipesService.getRecipes);
  renderCards(popularRecipes, recipesLoadConfig.popular);

  const articles = await loadCardsContent(articlesLoadConfig, articlesService.getArticles);
  renderCards(articles, articlesLoadConfig);

  const breakfastRecipes = await loadCardsContent(recipesLoadConfig.breakfast, recipesService.getRecipes);
  renderCards(breakfastRecipes, recipesLoadConfig.breakfast);

  const lunchRecipes = await loadCardsContent(recipesLoadConfig.lunch, recipesService.getRecipes);
  renderCards(lunchRecipes, recipesLoadConfig.lunch);

  const dinnerRecipes = await loadCardsContent(recipesLoadConfig.dinner, recipesService.getRecipes);
  renderCards(dinnerRecipes, recipesLoadConfig.dinner);

  const bakeryRecipes = await loadCardsContent(recipesLoadConfig.bakery, recipesService.getRecipes);
  renderCards(bakeryRecipes, recipesLoadConfig.bakery);
}

function addListeners() {
  formHandler.addUserButtonListener();
  formHandler.addRegisterFormListener();
  formHandler.addSignInFormListener();
  addArticleButtonsListeners();
  addRecipeButtonsListeners();
}

function addArticleButtonsListeners() {
  const articles = document.querySelectorAll('.article');
  articles.forEach(article => {
    const saveButton = article.querySelector('.save-btn') as HTMLButtonElement;
    const favoriteButton = article.querySelector('.favorite-btn') as HTMLButtonElement;

    saveButton.addEventListener('click', (e: Event) => {
      const targetButton = e.target as HTMLButtonElement;
      targetButton.classList.toggle('is-active');
      const userObject = JSON.parse(localStorage.getItem('user') || 'null');
      if (userObject) updateUserResources(userObject, article, targetButton, 'articles', 'saved');
    });

    favoriteButton.addEventListener('click', (e: Event) => {
      const targetButton = e.target as HTMLButtonElement;
      targetButton.classList.toggle('is-active');
      const userObject = JSON.parse(localStorage.getItem('user') || 'null');
      if (userObject) updateUserResources(userObject, article, targetButton, 'articles', 'favorite');
    });
  });
}

function addRecipeButtonsListeners() {
  const recipes = document.querySelectorAll('.card');
  recipes.forEach(recipe => {
    const saveButton = recipe.querySelector('.save-btn') as HTMLButtonElement;
    const favoriteButton = recipe.querySelector('.favorite-btn') as HTMLButtonElement;

    saveButton.addEventListener('click', (e: Event) => {
      const targetButton = e.target as HTMLButtonElement;
      targetButton.classList.toggle('is-active');
      const userObject = JSON.parse(localStorage.getItem('user') || 'null');
      if (userObject) updateUserResources(userObject, recipe, targetButton, 'recipes', 'saved');
    });

    favoriteButton.addEventListener('click', (e: Event) => {
      const targetButton = e.target as HTMLButtonElement;
      targetButton.classList.toggle('is-active');
      const userObject = JSON.parse(localStorage.getItem('user') || 'null');
      if (userObject) updateUserResources(userObject, recipe, targetButton, 'recipes', 'favorite');
    });
  });
}

function updateUserResources(
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
}

export { loadMainPageContent, addListeners };
