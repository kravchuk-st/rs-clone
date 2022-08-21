const express = require('express');
const logger = require('morgan');

const reciperouter = require('./models/recipes/recipe.router');

const app = express();

app.use(logger('tiny'));

app.use('/recipes', reciperouter);

app.use((req, res) => {
  res.status(404).send('404 NOT FOUND');
});

module.exports = app;
