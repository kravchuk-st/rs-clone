const vars = require('dotenv');
const path = require('path');

vars.config({
  path: path.join(__dirname, '../vars.env'),
});

const PORT = process.env.PORT;
const MONGO_CONNECT_QUERY = process.env.CONNECTION_QUERY;

const PAGE_NUMBER = 0;
const RECIPES_PER_PAGE = 10;
const ARTICLES_PER_PAGE = 7;

const MIN_HEALTH_SCORE = 0;
const MAX_READY_TIME = 360;
const MIN_SERVING_PRICE = 1;
const MAX_SERVING_PRICE = 1500;
const MAX_CALORIES = 1500;
const MAX_CARBS = 300;
const MAX_FATS = 300;
const MAX_PROTEINS = 300;
const SORT_OPTION = 'veryPopular';

module.exports = {
  PORT,
  MONGO_CONNECT_QUERY,
  PAGE_NUMBER,
  RECIPES_PER_PAGE,
  ARTICLES_PER_PAGE,
  MIN_HEALTH_SCORE,
  MAX_READY_TIME,
  MIN_SERVING_PRICE,
  MAX_SERVING_PRICE,
  MAX_CALORIES,
  MAX_CARBS,
  MAX_FATS,
  MAX_PROTEINS,
  SORT_OPTION,
};
