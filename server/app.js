const express = require('express');
const logger = require('morgan');
let cors = require('cors');

const recipeRouter = require('./models/recipes/recipe.router');
const { StatusCodes } = require('http-status-codes');
const errorHandler = require('./errors/errorHandler');

const app = express();

app.use(logger('tiny'));
app.use(cors());

app.use('/recipes', recipeRouter);

app.use((req, res) => {
  res.status(StatusCodes.NOT_FOUND).send('404 Not found');
});

app.use(errorHandler);

module.exports = app;
