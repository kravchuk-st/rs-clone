import { IUserResponse } from '../types';
import createElemWithClass from '../helpers/createElementWithClass';
import * as userService from '../api/userService';
import { ENDPOINTS } from '../config/api.config';
import { MOCK_INGREDIENTS } from '../constants';

export const deleteUserProduct = (targetProduct: HTMLElement, parentList: HTMLElement, productName: string): void => {
  parentList.removeChild(targetProduct);
  checkIfEmpty(parentList);

  const userObject = JSON.parse(localStorage.getItem('user') || 'null') as IUserResponse;
  if (userObject?.products) {
    if (parentList.classList.contains('products-list_stocked')) {
      if (userObject.products.own.includes(productName)) {
        userObject.products.own = userObject.products.own.filter(str => str !== productName);
      }
    } else if (parentList.classList.contains('products-list_needed')) {
      if (userObject.products.shopping.includes(productName)) {
        userObject.products.shopping = userObject.products.shopping.filter(str => str !== productName);
      }
    }
  }

  localStorage.setItem('user', JSON.stringify(userObject));
  userService.sendUserData(userObject, ENDPOINTS.userUpdate);
};

export const moveToStockedHandler = (
  targetProduct: HTMLElement,
  productName: string,
  dropdownProductsCurrent: string[],
  dropdownProductsNext: string[]
): void => {
  const stockedList = document.querySelector('.products-list_stocked') as HTMLElement;
  const userObject = JSON.parse(localStorage.getItem('user') || 'null') as IUserResponse;

  if (!userObject.products.own.includes(productName)) {
    addProductToList(productName, stockedList, dropdownProductsNext, dropdownProductsCurrent);
    addProductToLStorage(productName, 'own');
    deleteProductFromDropdown(productName, dropdownProductsNext);
  }
};

export const filterIncludedOptions = (options: string[], value: string): string[] => {
  return options.filter(item => item.includes(value));
};

export const checkIfEmpty = (list: HTMLElement): void => {
  if (list?.querySelectorAll('.products-list__item')?.length === 0) {
    list?.querySelector('.message')?.classList.remove('hidden');
  } else {
    list?.querySelector('.message')?.classList.add('hidden');
  }
};

export function renderDropdownItems(list: HTMLElement, dropdownList: string[]): void {
  list.innerHTML = '';

  dropdownList.forEach(item => {
    const listElem = createElemWithClass('li', 'product-options__item');
    listElem.id = item;
    listElem.innerText = item;
    list.append(listElem);
  });
}

export function addProductToList(
  product: string,
  list: HTMLElement,
  dropdownProductsCurrent: string[],
  dropdownProductsNext: string[]
): void {
  const listItem = createProductListItem(product, dropdownProductsCurrent, dropdownProductsNext);
  list.append(listItem);
  checkIfEmpty(list);
}

function createProductListItem(
  product: string,
  dropdownProductsCurrent: string[],
  dropdownProductsNext: string[]
): HTMLElement {
  const listItem = createElemWithClass('li', 'products-list__item');
  listItem.innerHTML = `
    <span class="product">${product}</span> 
    <div class="product__controls product-controls"> 
      <div class="product-controls__add-btn"></div> 
      <div class="product-controls__delete-btn"></div>
    </div> 
  `;

  listItem.querySelector('.product-controls__delete-btn')?.addEventListener('click', e => {
    const parentList = listItem.closest('.products-list') as HTMLElement;
    const target = e.target as HTMLElement;
    const targetProduct = target.closest('.products-list__item') as HTMLElement;
    const productName = (targetProduct.querySelector('span') as HTMLElement).innerText.trim().toLowerCase();

    deleteUserProduct(targetProduct, parentList, productName);
    addProductToDropdown(productName, dropdownProductsCurrent);
  });

  listItem.querySelector('.product-controls__add-btn')?.addEventListener('click', e => {
    const parentList = listItem.closest('.products-list') as HTMLElement;
    const target = e.target as HTMLElement;
    const targetProduct = target.closest('.products-list__item') as HTMLElement;
    const productName = (targetProduct.querySelector('span') as HTMLElement).innerText.trim().toLowerCase();

    moveToStockedHandler(targetProduct, productName, dropdownProductsCurrent, dropdownProductsNext);
    deleteUserProduct(targetProduct, parentList, productName);
    addProductToDropdown(productName, dropdownProductsCurrent);
  });

  return listItem;
}

export function renderListsFromLStorage(dropdownProductsStocked: string[], dropdownProductsNeeded: string[]) {
  const userObject = JSON.parse(localStorage.getItem('user') || 'null') as IUserResponse;
  const shoppingList = document.querySelector('.products-list_needed') as HTMLElement;
  const stockedList = document.querySelector('.products-list_stocked') as HTMLElement;

  if (userObject?.products) {
    userObject.products.own?.forEach(product => {
      deleteProductFromDropdown(product, dropdownProductsStocked);
      const listItem = createProductListItem(product, dropdownProductsStocked, dropdownProductsNeeded);
      stockedList.append(listItem);
    });
    userObject.products.shopping?.forEach(product => {
      deleteProductFromDropdown(product, dropdownProductsNeeded);
      const listItem = createProductListItem(product, dropdownProductsNeeded, dropdownProductsStocked);
      shoppingList.append(listItem);
    });
  }

  checkIfEmpty(shoppingList);
  checkIfEmpty(stockedList);
}

export function addProductToLStorage(str: string, listName: 'own' | 'shopping'): void {
  const userObject = JSON.parse(localStorage.getItem('user') || 'null') as IUserResponse;
  if (userObject?.products) {
    userObject.products[listName].push(str);
    localStorage.setItem('user', JSON.stringify(userObject));
    userService.sendUserData(userObject, ENDPOINTS.userUpdate);
  }
}

export function addProductToDropdown(productName: string, dropdownList: string[]) {
  if (MOCK_INGREDIENTS.includes(productName) && !dropdownList.includes(productName)) {
    dropdownList.push(productName);
    dropdownList.sort();
  }
}

export function deleteProductFromDropdown(productName: string, dropdownList: string[]) {
  const productIndex = dropdownList.findIndex(elementName => elementName === productName.toLowerCase());
  const deleteCount = productIndex === -1 ? 0 : 1;
  dropdownList.splice(productIndex, deleteCount);
}
