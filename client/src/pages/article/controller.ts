import * as articlesService from '../../api/articlesService';
import * as recipesService from '../../api/recipesService';
import { renderArticle, renderRelevantRecipes } from './render';
import { handleSaveFavoriteButtons } from '../../features/cardButtonsHandler';
import * as formHandler from '../../helpers/loginFormHandlers';

const userObject = JSON.parse(localStorage.getItem('user') || 'null');

async function loadArticle(articleId: string) {
  const articleData = await articlesService.getArticlesById(articleId);
  renderArticle(articleData, userObject);
  if (articleData.relevantRecipes.length > 0) {
    const recipesData = await Promise.all(
      articleData.relevantRecipes.map(async recipeId => await recipesService.getRecipeById(String(recipeId)))
    );
    renderRelevantRecipes(recipesData, userObject);
  }
}
function addListeners() {
  addArticleButtonsListeners();
  addRecipeButtonsListeners();
  formHandler.addUserButtonListener();
  formHandler.addRegisterFormListener();
  formHandler.addSignInFormListener();
}

function addArticleButtonsListeners() {
  const articleButtonsContainer = document.querySelector('.article-container') as HTMLElement;
  handleSaveFavoriteButtons(articleButtonsContainer, 'articles');
}

function addRecipeButtonsListeners() {
  const recipes = document.querySelectorAll('.card');
  recipes.forEach(recipe => {
    handleSaveFavoriteButtons(recipe, 'recipes');
  });
}

export { loadArticle, addListeners };
