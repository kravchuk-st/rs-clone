import loadCardsContent from '../../features/loadCards';
import * as recipesService from '../../api/recipesService';
import * as articlesService from '../../api/articlesService';
import * as formHandler from '../../helpers/loginFormHandlers';

import { recipesLoadConfig, articlesLoadConfig } from './config';
import { renderCards } from '../../features/renderCards';
import { handleSaveFavoriteButtons } from '../../features/cardButtonsHandler';

const userObject = JSON.parse(localStorage.getItem('user') || 'null');

async function loadMainPageContent() {
  const popularRecipes = await loadCardsContent(recipesLoadConfig.popular, recipesService.getRecipes);
  renderCards(popularRecipes, recipesLoadConfig.popular, userObject);

  const articles = await loadCardsContent(articlesLoadConfig, articlesService.getArticles);
  renderCards(articles, articlesLoadConfig, userObject);

  const breakfastRecipes = await loadCardsContent(recipesLoadConfig.breakfast, recipesService.getRecipes);
  renderCards(breakfastRecipes, recipesLoadConfig.breakfast, userObject);

  const lunchRecipes = await loadCardsContent(recipesLoadConfig.lunch, recipesService.getRecipes);
  renderCards(lunchRecipes, recipesLoadConfig.lunch, userObject);

  const dinnerRecipes = await loadCardsContent(recipesLoadConfig.dinner, recipesService.getRecipes);
  renderCards(dinnerRecipes, recipesLoadConfig.dinner, userObject);

  const bakeryRecipes = await loadCardsContent(recipesLoadConfig.bakery, recipesService.getRecipes);
  renderCards(bakeryRecipes, recipesLoadConfig.bakery, userObject);
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
    handleSaveFavoriteButtons(article, 'articles');
  });
}

function addRecipeButtonsListeners() {
  const recipes = document.querySelectorAll('.card');
  recipes.forEach(recipe => {
    handleSaveFavoriteButtons(recipe, 'recipes');
  });
}

export { loadMainPageContent, addListeners };
