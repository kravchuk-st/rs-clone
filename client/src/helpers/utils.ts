import { IQueryOptions } from '../types.js';

const transformOptionsToQuery = (queryOptions: IQueryOptions) => {
  const queryStringArray: string[] = [];

  for (const [optionProp, optionValue] of Object.entries(queryOptions)) {
    switch (typeof optionProp) {
      case 'string':
      case 'number':
      case 'boolean':
        queryStringArray.push(`${optionProp}=${optionValue}`);
        break;

      case 'object':
        queryStringArray.push(`${optionProp}=${optionValue.join(',')}`);
        break;
    }
  }

  return '?' + queryStringArray.join('&');
};

export default transformOptionsToQuery;
