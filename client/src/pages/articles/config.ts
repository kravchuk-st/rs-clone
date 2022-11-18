import { IArticleQueryOptions, ILoadArticleCard } from '../../types';

const initArticlesQueryOptions: IArticleQueryOptions = {
  page: 0,
  limit: 7,
  category: 'cooking tips',
};

const articlesLoadConfigInit: ILoadArticleCard = {
  containerClass: 'articles',
  listClass: 'articles__list',
  articleClassList: ['article'],
  queryOptions: initArticlesQueryOptions,
};

export { articlesLoadConfigInit };
