import { IArticle, ILoadArticleCard, ILoadRecipeCard, IRecipe } from '../types';
import * as articlesService from '../api/articlesService';
import * as recipesService from '../api/recipesService';

async function loadCardsContent(
  loadConfig: ILoadRecipeCard | ILoadArticleCard,
  contentLoadingService: typeof articlesService.getArticles | typeof recipesService.getRecipes
): Promise<IArticle[] | IRecipe[]> {
  return await contentLoadingService(loadConfig.queryOptions);
}

export default loadCardsContent;
