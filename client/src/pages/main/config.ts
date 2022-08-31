import { IQueryOptions } from '../../types';

const initPopularQueryOptions: IQueryOptions = {
  page: 0,
  limit: 9,
  'very-popular': true,
  sort: 'rating',
  'sort-dir': -1,
};

const initBreakfastQueryOptions: IQueryOptions = {
  page: 0,
  limit: 5,
  'dish-types': ['morning meal', 'breakfast'],
};

const initLunchQueryOptions: IQueryOptions = {
  page: 0,
  limit: 5,
  'dish-types': ['lunch'],
};

const initDinnerQueryOptions: IQueryOptions = {
  page: 0,
  limit: 5,
  'dish-types': ['dinner'],
};

const initBakeryQueryOptions: IQueryOptions = {
  page: 0,
  limit: 5,
  'dish-types': ['bakery'],
};

const loadConfig = {
  popular: {
    containerClass: 'slider',
    listClass: 'swiper-wrapper',
    listElemType: 'a',
    cardClassList: ['swiper-slide'],
    queryOptions: initPopularQueryOptions,
    largeCardIndex: -1,
  },
  breakfast: {
    containerClass: 'breakfast',
    listClass: 'recipes__list',
    listElemType: 'a',
    cardClassList: ['recipe__item'],
    queryOptions: initBreakfastQueryOptions,
    largeCardIndex: 1,
  },
  lunch: {
    containerClass: 'lunch',
    listClass: 'lunch__list',
    listElemType: 'a',
    cardClassList: ['lunch__item'],
    queryOptions: initLunchQueryOptions,
    largeCardIndex: 3,
  },
  dinner: {
    containerClass: 'dinner',
    listClass: 'dinner__list',
    listElemType: 'a',
    cardClassList: ['dinner__item'],
    queryOptions: initDinnerQueryOptions,
    largeCardIndex: 4,
  },
  bakery: {
    containerClass: 'bakery',
    listClass: 'bakery__list',
    listElemType: 'a',
    cardClassList: ['bakery__item'],
    queryOptions: initBakeryQueryOptions,
    largeCardIndex: 0,
  },
};

export { loadConfig };
