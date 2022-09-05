import { ILoadRecipeCard, IRecipeQueryOptions } from '../../types';

const initRecipesQueryOptions: IRecipeQueryOptions = {
  page: 0,
  limit: 10,
  'very-popular': true,
  sort: 'rating',
  'sort-dir': -1,
};

const recipesLoadConfig: ILoadRecipeCard = {
  containerClass: 'breakfast',
  listClass: 'recipes__list',
  listElemType: 'li',
  cardClassList: ['recipe__item'],
  queryOptions: initRecipesQueryOptions,
  largeCardIndex: -1,
};

export { recipesLoadConfig };
