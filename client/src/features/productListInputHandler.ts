import createElemWithClass from '../helpers/createElementWithClass';
import { MOCK_INGREDIENTS } from '../constants';
import { checkIfEmpty, deleteProduct, filterOptions, moveToStockedHandler } from './productHandlerHelpers';
import { IUserResponse } from '../types';

const addListenersToUserInput = (id: string): void => {
  const userObject = JSON.parse(localStorage.getItem('user') || 'null') as IUserResponse;
  const selectWrapper = document.getElementById(id) as HTMLElement;
  const inputElem = selectWrapper.querySelector('.products-input') as HTMLInputElement;
  const selectOptionsHolder = selectWrapper.querySelector('.scrolling-area') as HTMLElement;
  const dropdownMenu = selectWrapper.querySelector('.product-options') as HTMLElement;
  const addedProductsList = (selectWrapper.parentElement as HTMLElement).querySelector('.products-list') as HTMLElement;

  let dropdownProducts = MOCK_INGREDIENTS;

  renderListsfromStorage();

  checkIfEmpty(addedProductsList);

  renderProductOptions(selectOptionsHolder, dropdownProducts);
  inputElem.addEventListener('click', () => {
    renderProductOptions(selectOptionsHolder, dropdownProducts);
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
      renderProductOptions(selectOptionsHolder, dropdownProducts);
      inputElem.value = '';
      dropdownMenu.classList.remove('is-active');
    }
  });

  selectOptionsHolder.addEventListener('click', e => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('product-options__item')) {
      const productName = target.innerText;
      addToList(productName, addedProductsList);
      dropdownProducts = dropdownProducts.filter(item => item !== productName);
      inputElem.value = '';
      renderProductOptions(selectOptionsHolder, dropdownProducts);
      inputElem.focus();
    }
  });

  inputElem.addEventListener('input', () => {
    dropdownMenu.classList.add('is-active');
    const relevantIngredients = filterOptions(dropdownProducts, inputElem.value.trim().toLocaleLowerCase());
    relevantIngredients.length
      ? renderProductOptions(selectOptionsHolder, relevantIngredients)
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
        renderProductOptions(selectOptionsHolder, dropdownProducts);
      }
    });
    listItem.querySelector('.product-controls__add-btn')?.addEventListener('click', e => moveToStockedHandler(e));
    return listItem;
  }

  function renderListsfromStorage() {
    const shoppingList = document.querySelector('.products-list_needed') as HTMLElement;
    const stockedList = document.querySelector('.products-list_stocked') as HTMLElement;
    if (userObject?.products) {
      userObject.products.own?.forEach(product => {
        const listItem = createListItem(product);
        stockedList.append(listItem);
      });
      userObject.products.shopping?.forEach(product => {
        const listItem = createListItem(product);
        shoppingList.append(listItem);
      });
    }
  }

  function addToList(product: string, list: HTMLElement): void {
    const listItem = createListItem(product);
    list.append(listItem);
    checkIfEmpty(list);
  }

  function renderMessage(message: string): void {
    selectOptionsHolder.innerText = message;
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
