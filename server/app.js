const express = require('express');
const logger = require('morgan');

const recipeRouter = require('./models/recipes/recipe.router');
const { StatusCodes } = require('http-status-codes');
const errorHandler = require('./errors/errorHandler');

const app = express();

app.use(logger('tiny'));

app.use('/recipes', recipeRouter);

app.use((req, res) => {
  res.status(StatusCodes.NOT_FOUND).send('404 NOT FOUND');
});

app.use(errorHandler);

module.exports = app;
