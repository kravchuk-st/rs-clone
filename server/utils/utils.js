const { PAGE_NUMBER, ITEMS_PER_PAGE, SORT_OPTION } = require('../general/config');
const { queryMap, sortMap } = require('../general/queryMap');

const capitalizePath = (path) => {
  const pathSplitted = path.split('-');
  const pathProcessed = pathSplitted.map((pathPart, index) => {
    if (index === 0) return pathPart;

    return pathPart.charAt(0).toUpperCase() + pathPart.slice(1);
  });

  return pathProcessed.join('');
};

const transformQueryToSelector = (queryObject) => {
  const selector = {
    page: Number(queryObject.page) || PAGE_NUMBER,
    limit: Number(queryObject.limit) || ITEMS_PER_PAGE,
    sortOption: sortMap[queryObject.sort] || SORT_OPTION,
    sortDirection: Number(queryObject['sort-dir']) || -1,
  };

  for (let [property, value] of Object.entries(queryObject)) {
    if (queryMap[property] === undefined) continue;

    const [selectorProperty, selectorValue] = queryMap[property](value);
    selector[selectorProperty] = selectorValue;
  }

  return selector;
};

module.exports = {
  capitalizePath,
  transformQueryToSelector,
};
