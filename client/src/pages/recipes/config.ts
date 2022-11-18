import { ILoadRecipeCard, IRecipeQueryOptions } from '../../types';

const initRecipesQueryOptions: IRecipeQueryOptions = {
  page: 0,
  limit: 10,
  sort: 'rating',
  'sort-dir': -1,
};

const recipesLoadConfigInit: ILoadRecipeCard = {
  containerClass: 'recipes',
  listClass: 'recipes__list',
  listElemType: 'div',
  cardClassList: ['card-wrapper', 'card-wrapper_centered'],
  queryOptions: initRecipesQueryOptions,
  largeCardIndex: -1,
};

export { recipesLoadConfigInit };
