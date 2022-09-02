const express = require('express');
const logger = require('morgan');
let cors = require('cors');

const recipesRouter = require('./models/recipes/recipe.router');
const articlesRouter = require('./models/articles/article.router');
const { StatusCodes } = require('http-status-codes');
const errorHandler = require('./errors/errorHandler');
const errorMessages = require('./errors/errorMessages.config');

const app = express();

process.on('unhandledRejection', (error) => {
  console.log('unhandledRejection', error.message);
});

app.use(logger('tiny'));
app.use(cors());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use('/recipes', recipesRouter);
app.use('/articles', articlesRouter);

app.use((req, res) => {
  res.status(StatusCodes.NOT_FOUND).send(errorMessages.general.notFound);
});

app.use(errorHandler);

module.exports = app;
