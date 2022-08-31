import { renderRecipeCard } from './render';
import * as recipesSerivice from '../../api/recipesService';
import { ILoadRecipeCard } from '../../types';
import { loadConfig } from './config';

async function loadRecipesMainPage() {
  await loadRecipesToSection(loadConfig.popular);
  await loadRecipesToSection(loadConfig.breakfast);
  await loadRecipesToSection(loadConfig.lunch);
  await loadRecipesToSection(loadConfig.dinner);
  await loadRecipesToSection(loadConfig.bakery);
}

async function loadRecipesToSection(loadConfig: ILoadRecipeCard) {
  const sectionContainer = document.querySelector(`.${loadConfig.containerClass}`) as HTMLElement;
  const sectionContainerList = sectionContainer.querySelector(`.${loadConfig.listClass}`) as HTMLUListElement;

  const recipesData = await recipesSerivice.getRecipes(loadConfig.queryOptions);

  const recipeCards = recipesData.map((recipe, recipeIndex) => {
    const size = recipeIndex === loadConfig.largeCardIndex ? 'large' : 'normal';
    return renderRecipeCard(recipe, size, loadConfig.cardClassList, loadConfig.listElemType);
  });

  sectionContainerList.append(...recipeCards);
}

export { loadRecipesMainPage };
