const router = require('express').Router();
const recipeService = require('./recipe.service');
const { QueryError } = require('../../errors/errorEmitter');

const { StatusCodes } = require('http-status-codes');

router.get('/distinct', async (req, res, next) => {
  const recipePath = req.query.recipePath;
  if (!recipePath) next(new QueryError(StatusCodes.BAD_REQUEST, 'Invalid query parameters'));

  await recipeService
    .getDistinct(recipePath)
    .then((value) => res.status(StatusCodes.OK).send(value))
    .catch((err) => next(err));
});

router.get('/:id', async (req, res, next) => {
  const recipeId = Number(req.params.id);
  if (!recipeId) next();

  await recipeService
    .getRecipe(recipeId)
    .then((recipe) => res.status(StatusCodes.OK).send(recipe))
    .catch((err) => next(err));
});

module.exports = router;
