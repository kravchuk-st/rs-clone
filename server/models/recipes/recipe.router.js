const router = require('express').Router();
const recipeService = require('./recipe.service');

const { StatusCodes } = require('http-status-codes');

router.get('/:id', async (req, res, next) => {
  const recipeId = Number(req.params.id);
  try {
    const recipe = await recipeService.getRecipe(recipeId);
    res.status(StatusCodes.OK).send(recipe);
  } catch (err) {
    err.status = StatusCodes.NOT_FOUND;
    next(err);
  }
});

module.exports = router;
