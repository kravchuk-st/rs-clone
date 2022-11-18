import { IArticleQueryOptions, ILoadArticleCard, IRecipeQueryOptions } from '../../types';

const initPopularQueryOptions: IRecipeQueryOptions = {
  page: 0,
  limit: 9,
  'very-popular': true,
  sort: 'rating',
  'sort-dir': -1,
};

const initBreakfastQueryOptions: IRecipeQueryOptions = {
  page: 0,
  limit: 5,
  'dish-types': ['morning meal', 'breakfast'],
};

const initLunchQueryOptions: IRecipeQueryOptions = {
  page: 0,
  limit: 5,
  'dish-types': ['lunch'],
};

const initDinnerQueryOptions: IRecipeQueryOptions = {
  page: 0,
  limit: 5,
  'dish-types': ['dinner'],
};

const initBakeryQueryOptions: IRecipeQueryOptions = {
  page: 0,
  limit: 5,
  'dish-types': ['bakery'],
};

const initArticlesQueryOptions: IArticleQueryOptions = {
  page: 0,
  limit: 3,
  category: 'cooking tips',
};

const recipesLoadConfig = {
  popular: {
    containerClass: 'slider',
    listClass: 'swiper-wrapper',
    listElemType: 'li',
    cardClassList: ['swiper-slide'],
    queryOptions: initPopularQueryOptions,
    largeCardIndex: -1,
  },
  breakfast: {
    containerClass: 'breakfast',
    listClass: 'recipes__list',
    listElemType: 'li',
    cardClassList: ['recipe__item'],
    queryOptions: initBreakfastQueryOptions,
    largeCardIndex: 1,
  },
  lunch: {
    containerClass: 'lunch',
    listClass: 'lunch__list',
    listElemType: 'li',
    cardClassList: ['lunch__item'],
    queryOptions: initLunchQueryOptions,
    largeCardIndex: 3,
  },
  dinner: {
    containerClass: 'dinner',
    listClass: 'dinner__list',
    listElemType: 'li',
    cardClassList: ['dinner__item'],
    queryOptions: initDinnerQueryOptions,
    largeCardIndex: 4,
  },
  bakery: {
    containerClass: 'bakery',
    listClass: 'bakery__list',
    listElemType: 'li',
    cardClassList: ['bakery__item'],
    queryOptions: initBakeryQueryOptions,
    largeCardIndex: 0,
  },
};

const articlesLoadConfig: ILoadArticleCard = {
  containerClass: 'articles',
  listClass: 'articles__list',
  articleClassList: ['article'],
  queryOptions: initArticlesQueryOptions,
};

export { recipesLoadConfig, articlesLoadConfig };
