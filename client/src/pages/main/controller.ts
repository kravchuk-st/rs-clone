import { renderRecipeCard } from './render';
import * as recipesSerivice from '../../api/recipesService';
import { ILoadConfig } from '../../types';
import { loadConfig } from './config';

async function loadRecipesMainPage() {
  await loadRecipesToSection(loadConfig.breakfast);
}

async function loadRecipesToSection(loadConfig: ILoadConfig) {
  const sectionContainer = document.querySelector(`.${loadConfig.containerClass}`) as HTMLElement;
  const sectionContainerList = sectionContainer.querySelector(`.${loadConfig.listClass}`) as HTMLUListElement;

  const recipesData = await recipesSerivice.getRecipes(loadConfig.queryOptions);

  const recipeCards = recipesData.map((recipe, recipeIndex) => {
    const size = recipeIndex === loadConfig.largeCardIndex ? 'large' : 'normal';
    return renderRecipeCard(recipe, size);
  });

  sectionContainerList.append(...recipeCards);
}

export { loadRecipesMainPage };
