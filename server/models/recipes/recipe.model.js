const mongoose = require('mongoose');

const { Schema } = mongoose;

const RecipeSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  vegetarian: Boolean,
  glutenFree: Boolean,
  dairyFree: Boolean,
  veryHealthy: Boolean,
  cheap: Boolean,
  veryPopular: Boolean,
  preparationMinutes: Number,
  cookingMinutes: Number,
  aggregateLikes: Number,
  healthScore: Number,
  pricePerServing: Number,
  extendedIngredients: [
    {
      id: Number,
      aisle: String,
      image: String,
      name: String,
      nameClean: String,
      original: String,
      originalName: String,
      amount: Number,
      unit: String,
      measures: {
        us: {
          amount: Number,
          unitShort: String,
          unitLong: String,
        },
        metric: {
          amount: Number,
          unitShort: String,
          unitLong: String,
        },
      },
    },
  ],
  title: String,
  readyInMinutes: Number,
  servings: Number,
  sourceUrl: String,
  image: String,
  imageType: String,
  summary: String,
  cuisines: [String],
  dishTypes: [String],
  diets: [String],
  instructions: String,
  analyzedInstructions: [
    {
      name: String,
      steps: [
        {
          number: Number,
          step: String,
          ingredients: [
            {
              id: Number,
              name: String,
              localizedName: String,
              image: String,
            },
          ],
          equipment: [
            {
              id: Number,
              name: String,
              localizedName: String,
              image: String,
            },
          ],
        },
      ],
    },
  ],
});

const Recipe = mongoose.model('recipes', RecipeSchema);

module.exports = Recipe;
