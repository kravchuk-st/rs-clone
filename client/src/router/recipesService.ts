import { BASE_URL, ENDPOINTS } from '../config/config.js';
import { IRecipe } from '../types.js';

const getRecipes = async (pageNumber?: number, recipesPerPage?: number): Promise<IRecipe[]> => {
  const queryPropsArray: string[] = [];

  if (pageNumber !== undefined) {
    queryPropsArray.push(`page=${pageNumber}`);
  }
  if (recipesPerPage !== undefined) {
    queryPropsArray.push(`limit=${recipesPerPage}`);
  }

  const queryProps = queryPropsArray.length !== 0 ? '?' + queryPropsArray.join('&') : '';

  const response = await fetch(`${BASE_URL}${ENDPOINTS.recipes}${queryProps}`);
  return (response.json() as unknown) as IRecipe[];
};

export { getRecipes };
