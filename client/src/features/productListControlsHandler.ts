import { deleteProduct, moveToStockedHandler } from './productHandlerHelpers';

const productListControlsHandler = (): void => {
  const addButtonsList = document.querySelectorAll('.product-controls__add-btn');
  const deleteButtonsList = document.querySelectorAll('.product-controls__delete-btn');

  addButtonsList.forEach(btn => {
    btn.addEventListener('click', e => moveToStockedHandler(e));
  });

  deleteButtonsList.forEach(btn => {
    btn.addEventListener('click', e => deleteProduct(e));
  });
};

export default productListControlsHandler;
