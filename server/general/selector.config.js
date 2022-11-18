const { recipesSortMap } = require('./queryMap');
const { PAGE_NUMBER, RECIPES_PER_PAGE, ARTICLES_PER_PAGE, SORT_OPTION } = require('./constants');

const recipesSelector = (queryObject) => {
  return {
    page: Number(queryObject.page) || PAGE_NUMBER,
    limit: Number(queryObject.limit) || RECIPES_PER_PAGE,
    sortOption: recipesSortMap[queryObject.sort] || SORT_OPTION,
    sortDirection: Number(queryObject['sort-dir']) || -1,
  };
};

const articlesSelector = (queryObject) => {
  return {
    page: Number(queryObject.page) || PAGE_NUMBER,
    limit: Number(queryObject.limit) || ARTICLES_PER_PAGE,
  };
};

module.exports = { recipesSelector, articlesSelector };
