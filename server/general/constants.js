const vars = require('dotenv');
const path = require('path');

vars.config({
  path: path.join(__dirname, '../vars.env'),
});

const PORT = process.env.PORT;
const MONGO_CONNECT_QUERY = process.env.CONNECTION_QUERY;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

const SALT_ROUNDS = 8;

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

const ARTICLES_CATEGORY = 'cooking tips';

const MS_IN_SECOND = 1000;

module.exports = {
  PORT,
  MONGO_CONNECT_QUERY,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  SALT_ROUNDS,
  PAGE_NUMBER,
  RECIPES_PER_PAGE,
  ARTICLES_PER_PAGE,
  ARTICLES_CATEGORY,
  MIN_HEALTH_SCORE,
  MAX_READY_TIME,
  MIN_SERVING_PRICE,
  MAX_SERVING_PRICE,
  MAX_CALORIES,
  MAX_CARBS,
  MAX_FATS,
  MAX_PROTEINS,
  SORT_OPTION,
  MS_IN_SECOND,
};
