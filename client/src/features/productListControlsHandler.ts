const productListControlsHandler = (): void => {
  const addButtonsList = document.querySelectorAll('.product-controls__add-btn');
  const deleteButtonsList = document.querySelectorAll('.product-controls__delete-btn');
  const shoppingList = document.querySelector('.products-list_needed');
  const stockedList = document.querySelector('.products-list_stocked');

  addButtonsList.forEach(btn => {
    btn.addEventListener('click', e => moveToStockedHandler(e));
  });

  const moveToStockedHandler = (e: Event): void => {
    const target = e.target as HTMLElement;
    const targetProduct = target.closest('.products-list__item') as Node;
    shoppingList?.removeChild(targetProduct);
    stockedList?.append(targetProduct);
  };

  deleteButtonsList.forEach(btn => {
    btn.addEventListener('click', e => deleteProduct(e));
  });

  const deleteProduct = (e: Event): void => {
    const target = e.target as HTMLElement;
    const targetProduct = target.closest('.products-list__item') as Node;
    const parentList = target.closest('.products-list') as HTMLElement;
    parentList.removeChild(targetProduct);
  };
};

export default productListControlsHandler;
