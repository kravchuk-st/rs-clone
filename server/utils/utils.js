const capitalizePath = (path) => {
  const pathSplitted = path.split('-');
  const pathProcessed = pathSplitted.map((pathPart, index) => {
    if (index === 0) return pathPart;

    return pathPart.charAt(0).toUpperCase() + pathPart.slice(1);
  });

  return pathProcessed.join('');
};

module.exports = capitalizePath;
