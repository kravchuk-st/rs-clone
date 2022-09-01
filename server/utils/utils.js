const capitalizePath = (path) => {
  const pathSplitted = path.split('-');
  const pathProcessed = pathSplitted.map((pathPart, index) => {
    if (index === 0) return pathPart;

    return pathPart.charAt(0).toUpperCase() + pathPart.slice(1);
  });

  return pathProcessed.join('');
};

const transformQueryToSelector = (queryObject, selectorMaker, queryMap) => {
  const selector = selectorMaker(queryObject);

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
