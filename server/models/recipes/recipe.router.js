const router = require('express').Router();

const recipeService = require('./recipe.service');

router.get('/:id', async (req, res) => {
  const recipeId = Number(req.params.id);
  const recipe = await recipeService.get(recipeId);
  res.status(200).send(recipe);
});

module.exports = router;
