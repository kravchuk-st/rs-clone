import { BASE_URL, ENDPOINTS } from '../config/api.config';
import { IRecipe, IQueryOptions } from '../types';

import transformOptionsToQueryString from '../helpers/transformOptionsToQueryString';

const getRecipes = async (queryOptions?: IQueryOptions): Promise<IRecipe[]> => {
  let queryString = '';

  if (queryOptions && Object.keys(queryOptions).length !== 0) {
    queryString = transformOptionsToQueryString(queryOptions as IQueryOptions);
  }

  const response = await fetch(`${BASE_URL}${ENDPOINTS.recipes}/${queryString}`);

  return ((await response.json()) as unknown) as IRecipe[];
};

const getRecipeById = async (recipeId: number): Promise<IRecipe> => {
  const response = await fetch(`${BASE_URL}${ENDPOINTS.recipes}/${recipeId}`);

  return ((await response.json()) as unknown) as IRecipe;
};

const getDistinctProps = async (recipePath: string): Promise<string[] | number[]> => {
  const response = await fetch(`${BASE_URL}${ENDPOINTS.recipes}/distinct/${recipePath}`);

  return ((await response.json()) as unknown) as string[] | number[];
};

export { getRecipes, getRecipeById, getDistinctProps };
