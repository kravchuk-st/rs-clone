import {
  addProductToList,
  addProductToLStorage,
  deleteProductFromDropdown,
  checkIfEmpty,
  filterIncludedOptions,
  renderDropdownItems,
} from './productHandlerHelpers';

export default function addListenersToUserInput(
  id: string,
  dropdownProductsCurrent: string[],
  dropdownProductsNext: string[]
): void {
  const selectWrapper = document.getElementById(id) as HTMLElement;
  const inputElem = selectWrapper.querySelector('.products-input') as HTMLInputElement;
  const selectOptionsHolder = selectWrapper.querySelector('.scrolling-area') as HTMLElement;
  const dropdownMenu = selectWrapper.querySelector('.product-options') as HTMLElement;
  const addedProductsList = (selectWrapper.parentElement as HTMLElement).querySelector('.products-list') as HTMLElement;

  checkIfEmpty(addedProductsList);
  renderDropdownItems(selectOptionsHolder, dropdownProductsCurrent);

  inputElem.addEventListener('click', () => {
    renderDropdownItems(selectOptionsHolder, dropdownProductsCurrent);
    dropdownMenu.classList.add('is-active');
  });

  document.body.addEventListener('click', e => {
    const target = e.target as HTMLElement;
    if (!target.classList.contains('product-options__item') && !target.classList.contains('products-input')) {
      dropdownMenu.classList.remove('is-active');
    }
  });

  inputElem.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
      const productName = inputElem.value.trim();
      addProductToList(productName, addedProductsList, dropdownProductsCurrent, dropdownProductsNext);
      const destination = inputElem.id === 'products-input' ? 'shopping' : 'own';
      addProductToLStorage(productName, destination);
      deleteProductFromDropdown(productName, dropdownProductsCurrent);
      renderDropdownItems(selectOptionsHolder, dropdownProductsCurrent);
      inputElem.value = '';
      dropdownMenu.classList.remove('is-active');
    }
  });

  selectOptionsHolder.addEventListener('click', e => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('product-options__item')) {
      const productName = target.innerText;
      addProductToList(productName, addedProductsList, dropdownProductsCurrent, dropdownProductsNext);
      const destination =
        (target.closest('.select-wrapper') as HTMLElement).id === 'products-needed' ? 'shopping' : 'own';
      addProductToLStorage(productName, destination);
      deleteProductFromDropdown(productName, dropdownProductsCurrent);
      inputElem.value = '';
      renderDropdownItems(selectOptionsHolder, dropdownProductsCurrent);
      inputElem.focus();
    }
  });

  inputElem.addEventListener('input', () => {
    dropdownMenu.classList.add('is-active');
    const relevantIngredients = filterIncludedOptions(
      dropdownProductsCurrent,
      inputElem.value.trim().toLocaleLowerCase()
    );
    relevantIngredients.length
      ? renderDropdownItems(selectOptionsHolder, relevantIngredients)
      : renderMessage(
          'It seems like our recipes do not contain this product as ingredient, but you can add it to your shopping list'
        );
  });

  function renderMessage(message: string): void {
    selectOptionsHolder.innerText = message;
  }
}
