const Recipe = require('./recipe.model');

const getRecipe = async (recipeId) => {
  const recipe = await Recipe.findOne({ id: recipeId });
  if (!recipe) {
    throw new Error(`Recipe for id ${recipeId} not found`);
  }

  return recipe;
};

const getDistinct = async (recipePath) => {
  const distinctRecipePathValues = await Recipe.distinct(recipePath);
  if (!distinctRecipePathValues) {
    throw new Error(`Transfered recipe path was not found`);
  }

  return distinctRecipePathValues;
};

module.exports = { getRecipe, getDistinct };
