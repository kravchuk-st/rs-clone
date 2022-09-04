import loadCardsContent from '../../features/loadCards';
import * as recipesService from '../../api/recipesService';
import * as articlesService from '../../api/articlesService';
import * as formHandler from '../../helpers/loginFormHandlers';

import { recipesLoadConfig, articlesLoadConfig } from './config';
import { renderCards } from '../../features/renderCards';

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
}

export { loadMainPageContent, addListeners };
