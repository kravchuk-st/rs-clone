import { ILoadRecipeCard, IRecipeQueryOptions } from '../../types';

const initRecipesQueryOptions: IRecipeQueryOptions = {
  page: 0,
  limit: 10,
  'very-popular': true,
  sort: 'rating',
  'sort-dir': -1,
};

const recipesLoadConfig: ILoadRecipeCard = {
  containerClass: 'recipes',
  listClass: 'recipes__list',
  listElemType: 'div',
  cardClassList: ['card-wrapper', 'card-wrapper_centered'],
  queryOptions: initRecipesQueryOptions,
  largeCardIndex: -1,
};

export { recipesLoadConfig };
