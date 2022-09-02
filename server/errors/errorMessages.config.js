const errorMessages = {
  general: {
    notFound: '404 Not found',
    mongoConnection: 'MongoDB connection error:',
  },
  recipes: {
    invalidProperty: 'Invalid property path',
    invalidId: 'Invalid recipe ID',
    notFound: (recipeId) => `Recipe for id ${recipeId} not found`,
    propertyNotFound: 'Provided recipe property path was not found',
  },
  articles: {
    invalidId: 'Invalid article ID',
    notFound: (articleId) => `Article for id ${articleId} not found`,
  },
  user: {
    unauthorized: 'Signup failure',
  },
};

module.exports = errorMessages;
