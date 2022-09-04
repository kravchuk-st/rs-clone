export const deleteProduct = (e: Event): void => {
  const target = e.target as HTMLElement;
  const targetProduct = target.closest('.products-list__item') as Node;
  const parentList = target.closest('.products-list') as HTMLElement;

  parentList.removeChild(targetProduct);
};

export const moveToStockedHandler = (e: Event): void => {
  const shoppingList = document.querySelector('.products-list_needed');
  const stockedList = document.querySelector('.products-list_stocked');
  const target = e.target as HTMLElement;
  const targetProduct = target.closest('.products-list__item') as Node;

  shoppingList?.removeChild(targetProduct);
  stockedList?.append(targetProduct);
};

export const filterOptions = (options: string[], value: string): string[] => {
  return options.filter(item => item.includes(value));
};
