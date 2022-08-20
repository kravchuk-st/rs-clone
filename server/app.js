import express from 'express';
import logger from 'morgan';

import Recipe from './models/recipes/recipe.js';

const app = express();

app.use(logger('tiny'));

app.get('/recipes', async (req, res) => {
  const recipes = await Recipe.find();
  res.send(recipes);
});

app.use((req, res) => {
  res.status(404).send('404 NOT FOUND');
});

export default app;
