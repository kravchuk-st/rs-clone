const Recipe = require('./recipe.model');
const QueryError = require('../../errors/errorEmitter');

const { StatusCodes } = require('http-status-codes');

const getRecipe = async (recipeId) => {
  const recipe = await Recipe.findOne({ id: recipeId });
  if (!recipe) {
    throw new QueryError(StatusCodes.NOT_FOUND, `Recipe for id ${recipeId} not found`);
  }

  return recipe;
};

const getDistinct = async (recipePath) => {
  const distinctRecipePathValues = await Recipe.distinct(recipePath);
  if (!distinctRecipePathValues) {
    throw new QueryError(StatusCodes.NOT_FOUND, `Transfered recipe path was not found`);
  }

  return distinctRecipePathValues;
};

module.exports = { getRecipe, getDistinct };
