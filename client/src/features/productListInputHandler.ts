import createElemWithClass from '../helpers/createElementWithClass';
import { MOCK_INGREDIENTS } from '../constants';
import { checkIfEmpty, deleteProduct, filterOptions, moveToStockedHandler } from './productHandlerHelpers';

const addListenersToUserInput = (id: string): void => {
  const selectorWrapper = document.getElementById(id) as HTMLElement;
  const inputElem = selectorWrapper.querySelector('.products-input') as HTMLInputElement;
  const optionsHolder = selectorWrapper.querySelector('.scrolling-area') as HTMLElement;
  const dropdownMenu = selectorWrapper.querySelector('.product-options') as HTMLElement;
  const addedProductsList = (selectorWrapper.parentElement as HTMLElement).querySelector(
    '.products-list'
  ) as HTMLElement;

  let dropdownProducts = MOCK_INGREDIENTS;

  checkIfEmpty(addedProductsList);

  renderProductOptions(optionsHolder, dropdownProducts);
  inputElem.addEventListener('click', () => {
    renderProductOptions(optionsHolder, dropdownProducts);
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
      addToList(productName, addedProductsList);
      dropdownProducts = dropdownProducts.filter(item => item !== productName.toLowerCase());
      renderProductOptions(optionsHolder, dropdownProducts);
      inputElem.value = '';
      dropdownMenu.classList.remove('is-active');
    }
  });

  optionsHolder.addEventListener('click', e => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('product-options__item')) {
      const productName = target.innerText;
      addToList(productName, addedProductsList);
      dropdownProducts = dropdownProducts.filter(item => item !== productName);
      inputElem.value = '';
      renderProductOptions(optionsHolder, dropdownProducts);
      inputElem.focus();
    }
  });

  inputElem.addEventListener('input', () => {
    dropdownMenu.classList.add('is-active');
    const relevantIngredients = filterOptions(dropdownProducts, inputElem.value.trim().toLocaleLowerCase());
    relevantIngredients.length
      ? renderProductOptions(optionsHolder, relevantIngredients)
      : renderMessage(
          'It seems like our recipes do not contain this product as ingredient, but you can add it to your shopping list'
        );
  });

  function createListItem(product: string): HTMLElement {
    const listItem = createElemWithClass('li', 'products-list__item');
    listItem.innerHTML = `
      <span class="product">${product}</span> 
      <div class="product__controls product-controls"> 
        <div class="product-controls__add-btn"></div> 
        <div class="product-controls__delete-btn"></div>
      </div> 
    `;
    listItem.querySelector('.product-controls__delete-btn')?.addEventListener('click', e => {
      deleteProduct(e);
      checkIfEmpty(listItem.closest('.products-list') as HTMLElement);
      const target = e.target as HTMLElement;
      const productName = (target.closest('.products-list__item') as HTMLElement)?.innerText.trim().toLowerCase();
      if (MOCK_INGREDIENTS.includes(productName) && !dropdownProducts.includes(productName)) {
        dropdownProducts.push(productName);
        dropdownProducts.sort();
        renderProductOptions(optionsHolder, dropdownProducts);
      }
    });
    listItem.querySelector('.product-controls__add-btn')?.addEventListener('click', e => moveToStockedHandler(e));
    return listItem;
  }

  function addToList(product: string, list: HTMLElement): void {
    const listItem = createListItem(product);
    list.append(listItem);
    checkIfEmpty(list);
  }

  function renderMessage(message: string): void {
    optionsHolder.innerText = message;
  }
};

addListenersToUserInput('products-needed');
addListenersToUserInput('products-stocked');

function renderProductOptions(optionsHolder: HTMLElement, options: string[]): void {
  optionsHolder.innerHTML = '';
  const addedOptionElems = (optionsHolder.closest('.tabs-content__item') as HTMLElement).querySelectorAll(
    '.products-list__item'
  );

  const addedProducts: string[] = [];
  addedOptionElems.forEach(element => {
    addedProducts.push((element as HTMLElement).innerText);
  });

  options.forEach(item => {
    if (!addedProducts.includes(item)) {
      const listElem = createElemWithClass('li', 'product-options__item');
      listElem.id = item;
      listElem.innerText = item;
      optionsHolder.append(listElem);
    }
  });
}
