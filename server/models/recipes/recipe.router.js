const router = require('express').Router();
const recipeService = require('./recipe.service');
const QueryError = require('../../errors/errorEmitter');

const { PAGE_NUMBER, ITEMS_PER_PAGE } = require('../../general/config');

const { StatusCodes } = require('http-status-codes');

router.get('/', async (req, res, next) => {
  const pageNumber = req.query.page || PAGE_NUMBER;
  const recipesPerPage = req.query.limit || ITEMS_PER_PAGE;

  await recipeService
    .getRecipes(pageNumber, recipesPerPage)
    .then((value) => res.status(StatusCodes.OK).send(value))
    .catch((err) => next(err));
});

router.get('/distinct', async (req, res, next) => {
  const recipePath = req.query.recipePath;
  if (!recipePath) next(new QueryError(StatusCodes.BAD_REQUEST, 'Invalid query parameters'));

  await recipeService
    .getDistinctProps(recipePath)
    .then((value) => res.status(StatusCodes.OK).send(value))
    .catch((err) => next(err));
});

router.get('/:id', async (req, res, next) => {
  const recipeId = Number(req.params.id);
  if (!recipeId) next();

  await recipeService
    .getRecipeById(recipeId)
    .then((recipe) => res.status(StatusCodes.OK).send(recipe))
    .catch((err) => next(err));
});

module.exports = router;
