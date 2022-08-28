const {
  PAGE_NUMBER,
  ITEMS_PER_PAGE,
  MIN_HEALTH_SCORE,
  MAX_READY_TIME,
  MIN_SERVING_PRICE,
  MAX_SERVING_PRICE,
  MAX_CALORIES,
  MAX_CARBS,
  MAX_FATS,
  MAX_PROTEINS,
} = require('./config');

const queryMap = {
  page: (pageValue) => ['page', Number(pageValue) || PAGE_NUMBER],
  limit: (limitValue) => ['limit', Number(limitValue) || ITEMS_PER_PAGE],
  vegetarian: (passedValue) => ['vegetarian', passedValue === 'true' ? true : false],
  vegan: (passedValue) => ['vegan', passedValue === 'true' ? true : false],
  'gluten-free': (passedValue) => ['glutenFree', passedValue === 'true' ? true : false],
  'dairy-free': (passedValue) => ['dairyFree', passedValue === 'true' ? true : false],
  cheap: (passedValue) => ['cheap', passedValue === 'true' ? true : false],
  'very-popular': (passedValue) => ['veryPopular', passedValue === 'true' ? true : false],
  'min-health-score': (passedValue) => ['healthScore', { $gte: Number(passedValue) || MIN_HEALTH_SCORE }],
  'max-ready': (passedValue) => ['readyInMinutes', { $lte: Number(passedValue) || MAX_READY_TIME }],
  'serving-price': (passedValue) => {
    const [minPrice, maxPrice] = passedValue.split(',');
    return [
      'pricePerServing',
      { $gte: Number(minPrice) || MIN_SERVING_PRICE, $lte: Number(maxPrice) || MAX_SERVING_PRICE },
    ];
  },
  ingredients: (passedValue) => {
    const ingredients = passedValue.split(',');
    return ['extendedIngredients.name', { $in: ingredients }];
  },
  cuisines: (passedValue) => {
    const cuisines = passedValue.split(',');
    return ['cuisines', { $in: cuisines }];
  },
  'dish-types': (passedValue) => {
    const dishTypes = passedValue.split(',');
    return ['dishTypes', { $in: dishTypes }];
  },
  diets: (passedValue) => {
    const diets = passedValue.split(',');
    return ['diets', { $in: diets }];
  },
  'max-calories': (passedValue) => [
    'nutrition.nutrients',
    { $elemMatch: { name: 'Calories', amount: { $lte: Number(passedValue) || MAX_CALORIES } } },
  ],
  'max-carbs': (passedValue) => [
    'nutrition.nutrients',
    { $elemMatch: { name: 'Carbohydrates', amount: { $lte: Number(passedValue) || MAX_CARBS } } },
  ],
  'max-fats': (passedValue) => [
    'nutrition.nutrients',
    { $elemMatch: { name: 'Fat', amount: { $lte: Number(passedValue) || MAX_FATS } } },
  ],
  'max-proteins': (passedValue) => [
    'nutrition.nutrients',
    { $elemMatch: { name: 'Protein', amount: { $lte: Number(passedValue) || MAX_PROTEINS } } },
  ],
  search: (passedValue) => {
    const searchOptions = passedValue.split(',').join('|');
    return ['title', { $regex: searchOptions, $options: 'i' }];
  },
};

module.exports = queryMap;
