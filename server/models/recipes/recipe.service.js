const Recipe = require('./recipe.model');
const QueryError = require('../../errors/errorEmitter');

const { StatusCodes } = require('http-status-codes');

const getRecipes = async (selector) => {
  let { page: pageNumber, limit: recipesPerPage, ...restSelectors } = selector;

  return await Recipe.find(restSelectors)
    .skip(pageNumber * recipesPerPage)
    .limit(recipesPerPage);
};

const getRecipeById = async (recipeId) => {
  const recipe = await Recipe.findOne({ id: recipeId });
  if (!recipe || recipe.length === 0) {
    throw new QueryError(StatusCodes.NOT_FOUND, `Recipe for id ${recipeId} not found`);
  }

  return recipe;
};

const getDistinctProps = async (recipePath) => {
  const distinctRecipePathValues = await Recipe.distinct(recipePath);
  if (!distinctRecipePathValues || distinctRecipePathValues.length === 0) {
    throw new QueryError(StatusCodes.NOT_FOUND, `Provided recipe property path was not found`);
  }

  return distinctRecipePathValues;
};

module.exports = {
  getRecipeById,
  getDistinctProps,
  getRecipes,
};
