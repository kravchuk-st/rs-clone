const router = require('express').Router();
const { StatusCodes } = require('http-status-codes');

const recipeService = require('./recipe.service');
const QueryError = require('../../errors/errorEmitter');
const capitalizePath = require('../../utils/utils');

const { PAGE_NUMBER, ITEMS_PER_PAGE } = require('../../general/config');

router.get('/', async (req, res, next) => {
  const pageNumber = req.query.page ?? PAGE_NUMBER;
  const recipesPerPage = req.query.limit ?? ITEMS_PER_PAGE;

  await recipeService
    .getRecipes(pageNumber, recipesPerPage)
    .then((value) => res.status(StatusCodes.OK).send(value))
    .catch((err) => next(err));
});

router.get('/distinct/:propertyPath', async (req, res, next) => {
  const propertyPath = req.params.propertyPath;
  if (propertyPath === undefined) next(new QueryError(StatusCodes.BAD_REQUEST, 'Invalid property path'));

  const propertyPathProcessed = capitalizePath(propertyPath);

  await recipeService
    .getDistinctProps(propertyPathProcessed)
    .then((value) => res.status(StatusCodes.OK).send(value))
    .catch((err) => next(err));
});

router.get('/:id', async (req, res, next) => {
  try {
    if (isNaN(req.params.id)) throw new QueryError(StatusCodes.BAD_REQUEST, 'Invalid recipe ID');

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
