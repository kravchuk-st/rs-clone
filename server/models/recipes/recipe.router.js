const router = require('express').Router();

const recipeService = require('./recipe.service');

router.get('/:id', async (req, res, next) => {
  const recipeId = Number(req.params.id);
  try {
    const recipe = await recipeService.get(recipeId);
    res.status(200).send(recipe);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
