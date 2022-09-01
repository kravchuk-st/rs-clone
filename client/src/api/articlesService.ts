import { BASE_URL, ENDPOINTS } from '../config/api.config';
import { IArticle, IArticleQueryOptions } from '../types';

import transformOptionsToQueryString from '../helpers/transformOptionsToQueryString';

const getArticles = async (queryOptions?: IArticleQueryOptions): Promise<IArticle[]> => {
  let queryString = '';

  if (queryOptions && Object.keys(queryOptions).length !== 0) {
    queryString = transformOptionsToQueryString(queryOptions as IArticleQueryOptions);
  }

  const response = await fetch(`${BASE_URL}${ENDPOINTS.articles}/${queryString}`);

  return ((await response.json()) as unknown) as IArticle[];
};

const getArticlesById = async (articleId: string): Promise<IArticle> => {
  const response = await fetch(`${BASE_URL}${ENDPOINTS.articles}/${articleId}`);

  return ((await response.json()) as unknown) as IArticle;
};

export { getArticles, getArticlesById };
