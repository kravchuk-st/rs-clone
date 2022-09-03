import { renderRecipeCard, renderArticleCard } from './render';
import * as recipesService from '../../api/recipesService';
import * as articlesService from '../../api/articlesService';
import * as formHandler from '../../helpers/loginFormHandlers';

import { ILoadArticleCard, ILoadRecipeCard, IArticle, IRecipe } from '../../types';
import { recipesLoadConfig, articlesLoadConfig } from './config';

async function loadMainPageContent() {
  await loadContent(recipesLoadConfig.popular, recipesService.getRecipes);
  await loadContent(articlesLoadConfig, articlesService.getArticles);
  await loadContent(recipesLoadConfig.breakfast, recipesService.getRecipes);
  await loadContent(recipesLoadConfig.lunch, recipesService.getRecipes);
  await loadContent(recipesLoadConfig.dinner, recipesService.getRecipes);
  await loadContent(recipesLoadConfig.bakery, recipesService.getRecipes);
}

async function loadContent(
  loadConfig: ILoadRecipeCard | ILoadArticleCard,
  contentLoadingService: typeof articlesService.getArticles | typeof recipesService.getRecipes
) {
  const sectionContainer = document.querySelector(`.${loadConfig.containerClass}`) as HTMLElement;
  const sectionContainerList = sectionContainer.querySelector(`.${loadConfig.listClass}`) as HTMLUListElement;

  const itemsData = await contentLoadingService(loadConfig.queryOptions);
  const itemsCards = renderItems(itemsData, loadConfig);

  sectionContainerList.append(...itemsCards);
}

function renderItems(itemsData: IArticle[] | IRecipe[], loadConfig: ILoadRecipeCard | ILoadArticleCard) {
  return itemsData.map((item, itemIndex) => {
    if ('largeCardIndex' in loadConfig) {
      const size = itemIndex === loadConfig.largeCardIndex ? 'large' : 'normal';
      return renderRecipeCard(item as IRecipe, size, loadConfig.cardClassList, loadConfig.listElemType);
    }

    return renderArticleCard(item as IArticle, loadConfig.articleClassList);
  });
}

function addListeners() {
  formHandler.addUserButtonListener();
  formHandler.addRegisterFormListener();
  formHandler.addSignInFormListener();
}

export { loadMainPageContent, addListeners };
