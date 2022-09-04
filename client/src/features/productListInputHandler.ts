import createElemWithClass from '../helpers/createElementWithClass';
import { MOCK_INGREDIENTS } from '../constants';
import { checkIfEmpty, deleteProduct, filterOptions, moveToStockedHandler } from './productHandlerHelpers';

const optionsHolder = document.getElementById('relevant-options') as HTMLElement;
const productsInput = document.getElementById('products-input') as HTMLInputElement;
const dropdownMenu = document.querySelector('.product-options') as HTMLElement;
const shoppingList = document.querySelector('.products-list_needed') as HTMLElement;
const stockedList = document.querySelector('.products-list_stocked') as HTMLElement;
const userLists = [shoppingList, stockedList];

userLists.forEach(list => {
  checkIfEmpty(list);
});

let dropdownProducts = MOCK_INGREDIENTS;

renderProductOptions(MOCK_INGREDIENTS);
productsInput.addEventListener('click', () => {
  renderProductOptions(dropdownProducts);
  dropdownMenu.classList.add('is-active');
});

document.body.addEventListener('click', e => {
  const target = e.target as HTMLElement;
  if (!target.classList.contains('product-options__item') && target.id !== 'products-input') {
    dropdownMenu.classList.remove('is-active');
  }
});

productsInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    const productName = productsInput.value.trim();
    addToShoppingList(productName);
    dropdownProducts = dropdownProducts.filter(item => item !== productName.toLowerCase());
    renderProductOptions(dropdownProducts);
    productsInput.value = '';
    dropdownMenu.classList.remove('is-active');
  }
});

optionsHolder.addEventListener('click', e => {
  const target = e.target as HTMLElement;
  if (target.classList.contains('product-options__item')) {
    const productName = target.innerText;
    addToShoppingList(productName);
    dropdownProducts = dropdownProducts.filter(item => item !== productName);
    productsInput.value = '';
    renderProductOptions(dropdownProducts);
    productsInput.focus();
  }
});

productsInput.addEventListener('input', () => {
  dropdownMenu.classList.add('is-active');
  const relevantIngredients = filterOptions(dropdownProducts, productsInput.value.trim().toLocaleLowerCase());
  relevantIngredients.length
    ? renderProductOptions(relevantIngredients)
    : renderMessage(
        'It seems like our recipes do not contain this product as ingredient, but you can add it to your shopping list'
      );
});

function renderProductOptions(options: string[]): void {
  optionsHolder.innerHTML = '';
  options.forEach(item => {
    const listElem = createElemWithClass('li', 'product-options__item');
    listElem.id = item;
    listElem.innerText = item;
    optionsHolder.append(listElem);
  });
}

function addToShoppingList(product: string): void {
  const listItem = createListItem(product);
  shoppingList.append(listItem);
  checkIfEmpty(shoppingList);
}

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
      renderProductOptions(dropdownProducts);
    }
  });

  listItem.querySelector('.product-controls__add-btn')?.addEventListener('click', e => moveToStockedHandler(e));
  return listItem;
}

function renderMessage(message: string): void {
  optionsHolder.innerText = message;
}
