const Article = require('./article.model');
const QueryError = require('../../errors/errorEmitter');
const errorMessages = require('../../errors/errorMessages.config');

const { StatusCodes } = require('http-status-codes');

const getArticles = async (selector) => {
  let { page: pageNumber, limit: articlesPerPage, ...restSelectors } = selector;

  return Article.find(restSelectors)
    .skip(pageNumber * articlesPerPage)
    .limit(articlesPerPage);
};

const getArticleById = async (articleId) => {
  const article = await Article.findById(articleId);
  if (!article || article.length === 0) {
    throw new QueryError(StatusCodes.NOT_FOUND, errorMessages.articles.notFound(articleId));
  }

  return article;
};

module.exports = {
  getArticles,
  getArticleById,
};
