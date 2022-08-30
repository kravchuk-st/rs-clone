import { IQueryOptions } from '../../types';

const initBreakfastQueryOptions: IQueryOptions = {
  page: 0,
  limit: 5,
  'dish-types': ['morning meal', 'breakfast'],
};

const loadConfig = {
  breakfast: {
    containerClass: 'breakfast',
    listClass: 'recipes__list',
    queryOptions: initBreakfastQueryOptions,
    largeCardIndex: 1,
  },
};

export { loadConfig };
