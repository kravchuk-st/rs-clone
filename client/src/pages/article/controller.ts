import * as articlesService from '../../api/articlesService';
import * as recipesService from '../../api/recipesService';
import { renderArticle, renderRelevantRecipes } from './render';

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

export default loadArticle;
