import { EMPTY_MESSAGE } from '../constants';

export const deleteProduct = (e: Event): void => {
  const target = e.target as HTMLElement;
  const targetProduct = target.closest('.products-list__item') as Node;
  const parentList = target.closest('.products-list') as HTMLElement;

  parentList.removeChild(targetProduct);
  checkIfEmpty(parentList);
};

export const moveToStockedHandler = (e: Event): void => {
  const shoppingList = document.querySelector('.products-list_needed') as HTMLElement;
  const stockedList = document.querySelector('.products-list_stocked') as HTMLElement;
  const target = e.target as HTMLElement;
  const targetProduct = target.closest('.products-list__item') as Node;

  shoppingList?.removeChild(targetProduct);
  stockedList?.append(targetProduct);
  checkIfEmpty(shoppingList);
  checkIfEmpty(stockedList);
};

export const filterOptions = (options: string[], value: string): string[] => {
  return options.filter(item => item.includes(value));
};

export const checkIfEmpty = (list: HTMLElement): void => {
  if (list?.querySelectorAll('.products-list__item')?.length === 0) {
    list?.querySelector('.message')?.classList.remove('hidden');
  } else {
    list?.querySelector('.message')?.classList.add('hidden');
  }
};
