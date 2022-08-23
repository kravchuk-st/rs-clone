const express = require('express');
const logger = require('morgan');

const Recipe = require('./models/recipes/recipe');

const app = express();

app.use(logger('tiny'));

app.get('/recipes', async (req, res) => {
  const recipes = await Recipe.find();
  res.send(recipes);
});

app.use((req, res) => {
  res.status(404).send('404 NOT FOUND');
});

module.exports = app;
