import { renderRecipe } from './render';
import * as recipesSerivice from '../../api/recipesService';

async function loadRecipe(recipeId: number) {
  const recipeData = await recipesSerivice.getRecipeById(recipeId);
  renderRecipe(recipeData);
}

export { loadRecipe };
