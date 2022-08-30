import { IQueryOptions } from '../../types';

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
  breakfast: {
    containerClass: 'breakfast',
    listClass: 'recipes__list',
    cardClassList: ['recipe__item'],
    queryOptions: initBreakfastQueryOptions,
    largeCardIndex: 1,
  },
  lunch: {
    containerClass: 'lunch',
    listClass: 'lunch__list',
    cardClassList: ['lunch__item'],
    queryOptions: initLunchQueryOptions,
    largeCardIndex: 3,
  },
  dinner: {
    containerClass: 'dinner',
    listClass: 'dinner__list',
    cardClassList: ['dinner__item'],
    queryOptions: initDinnerQueryOptions,
    largeCardIndex: 4,
  },
  bakery: {
    containerClass: 'bakery',
    listClass: 'bakery__list',
    cardClassList: ['bakery__item'],
    queryOptions: initBakeryQueryOptions,
    largeCardIndex: 0,
  },
};

export { loadConfig };
