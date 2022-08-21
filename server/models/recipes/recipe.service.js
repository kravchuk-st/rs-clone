const Recipe = require('./recipe.model');

const get = async (recipeId) => {
  const recipe = await Recipe.findOne({ id: recipeId });
  if (!recipe) {
    throw new Error(`Recipe for id ${recipeId} not found`);
  }

  return recipe;
};

module.exports = { get };
