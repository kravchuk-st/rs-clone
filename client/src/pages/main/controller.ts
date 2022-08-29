import { renderRecipeCard } from './render';
import * as recipesSerivice from '../../api/recipesService';
import { initBreakfastQueryOptions } from './config';

async function loadRecipes() {
  const breakfastContainer = document.querySelector('.breakfast') as HTMLElement;
  const breakfastContainerList = breakfastContainer.querySelector('.recipes__list') as HTMLUListElement;

  const recipesData = await recipesSerivice.getRecipes(initBreakfastQueryOptions);

  const recipeCards = recipesData.map((recipe, recipeIndex) => {
    const size = recipeIndex === 1 ? 'large' : 'normal';
    return renderRecipeCard(recipe, size);
  });

  breakfastContainerList.append(...recipeCards);
}

export { loadRecipes };
