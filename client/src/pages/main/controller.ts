import { renderRecipeCard, renderArticleCard } from './render';
import * as recipesSerivice from '../../api/recipesService';
import * as articlesService from '../../api/articlesService';
import { ILoadArticleCard, ILoadRecipeCard, IArticle, IRecipe } from '../../types';
import { recipesLoadConfig, articlesLoadConfig } from './config';

function loadMainPageContent() {
  loadContent(recipesLoadConfig.popular, recipesSerivice.getRecipes);
  loadContent(articlesLoadConfig, articlesService.getArticles);
  loadContent(recipesLoadConfig.breakfast, recipesSerivice.getRecipes);
  loadContent(recipesLoadConfig.lunch, recipesSerivice.getRecipes);
  loadContent(recipesLoadConfig.dinner, recipesSerivice.getRecipes);
  loadContent(recipesLoadConfig.bakery, recipesSerivice.getRecipes);
}

async function loadContent(
  loadConfig: ILoadRecipeCard | ILoadArticleCard,
  contentLoadingService: typeof articlesService.getArticles | typeof recipesSerivice.getRecipes
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

export { loadMainPageContent };
