const router = require('express').Router();
const { StatusCodes } = require('http-status-codes');

const articleService = require('./article.service');
const QueryError = require('../../errors/errorEmitter');
const Utils = require('../../utils/utils');
const errorMessages = require('../../errors/errorMessages.config');

const { articlesSelector } = require('../../general/selector.config');
const { articlesQueryMap } = require('../../general/queryMap');

router.get('/', async (req, res, next) => {
  const mongoSelector = Utils.transformQueryToSelector(req.query, articlesSelector, articlesQueryMap);

  await articleService
    .getArticles(mongoSelector)
    .then((value) => res.status(StatusCodes.OK).send(value))
    .catch((err) => next(err));
});

router.get('/:id', async (req, res, next) => {
  await articleService
    .getArticleById(req.params.id)
    .then((article) => res.status(StatusCodes.OK).send(article))
    .catch((err) => next(err));
});

module.exports = router;
