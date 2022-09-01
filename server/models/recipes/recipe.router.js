const router = require('express').Router();
const { StatusCodes } = require('http-status-codes');

const recipeService = require('./recipe.service');
const QueryError = require('../../errors/errorEmitter');
const Utils = require('../../utils/utils');
const errorMessages = require('../../errors/errorMessages.config');

const { recipesSelector } = require('../../general/selector.config');
const { recipesQueryMap } = require('../../general/queryMap');

router.get('/', async (req, res, next) => {
  const mongoSelector = Utils.transformQueryToSelector(req.query, recipesSelector, recipesQueryMap);

  await recipeService
    .getRecipes(mongoSelector)
    .then((value) => res.status(StatusCodes.OK).send(value))
    .catch((err) => next(err));
});

router.get('/distinct/:propertyPath', async (req, res, next) => {
  const propertyPath = req.params.propertyPath;
  if (propertyPath === undefined) next(new QueryError(StatusCodes.BAD_REQUEST, errorMessages.recipes.invalidProperty));

  const propertyPathProcessed = Utils.capitalizePath(propertyPath);

  await recipeService
    .getDistinctProps(propertyPathProcessed)
    .then((value) => res.status(StatusCodes.OK).send(value))
    .catch((err) => next(err));
});

router.get('/:id', async (req, res, next) => {
  try {
    if (isNaN(req.params.id)) throw new QueryError(StatusCodes.BAD_REQUEST, errorMessages.recipes.invalidId);

    const recipeId = Number(req.params.id);

    await recipeService
      .getRecipeById(recipeId)
      .then((recipe) => res.status(StatusCodes.OK).send(recipe))
      .catch((err) => next(err));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
