import { renderRecipeCard } from './render';

function loadRecipes() {
  const breakfastContainer = document.querySelector('.breakfast') as HTMLElement;
  const breakfastContainerList = breakfastContainer.querySelector('.recipes__list') as HTMLUListElement;
  const recipeCards = [];

  for (let i = 0; i < 5; i++) {
    recipeCards.push(renderRecipeCard());
  }

  breakfastContainerList.append(...recipeCards);
}

export { loadRecipes };
