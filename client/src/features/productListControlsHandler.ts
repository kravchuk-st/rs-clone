import { deleteUserProduct, moveToStockedHandler } from './productHandlerHelpers';

const productListControlsHandler = (): void => {
  const addButtonsList = document.querySelectorAll('.product-controls__add-btn');
  const deleteButtonsList = document.querySelectorAll('.product-controls__delete-btn');

  addButtonsList.forEach(btn => {
    btn.addEventListener('click', e => {
      console.log('add button')
      // moveToStockedHandler(e)
    });
  });

  deleteButtonsList.forEach(btn => {
    const parentList = btn.closest('.products-list') as HTMLElement;
    // const target = e.target as HTMLElement;
    const targetProduct = btn.closest('.products-list__item') as HTMLElement;
    const productName = (targetProduct.querySelector('span') as HTMLElement).innerText.trim().toLowerCase();
    btn.addEventListener('click', e => {
      deleteUserProduct(targetProduct, parentList, productName);
    });
  });
};

export default productListControlsHandler;
