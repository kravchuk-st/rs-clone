const errorMessages = {
  general: {
    notFound: '404 Not found',
    mongoConnection: 'MongoDB connection error:',
    internal: 'Internal server error',
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
    invalidPassword: 'Invalid Password',
    forbidden: 'Access denied',
    userExists: 'User with such email already exists',
    notFound: 'User not found',
  },
};

module.exports = errorMessages;
