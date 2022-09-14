import { IUserResponse } from '../types';
import { addToList } from './productListInputHandler';

export const deleteProduct = (e: Event): void => {
  const target = e.target as HTMLElement;
  const targetProduct = target.closest('.products-list__item') as HTMLElement;
  const parentList = target.closest('.products-list') as HTMLElement;
  const productName = (targetProduct.querySelector('span') as HTMLElement).innerText.toLowerCase().trim();

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
};

export const moveToStockedHandler = (e: Event): void => {
  const shoppingList = document.querySelector('.products-list_needed') as HTMLElement;
  const stockedList = document.querySelector('.products-list_stocked') as HTMLElement;
  const target = e.target as HTMLElement;
  const targetProduct = target.closest('.products-list__item') as HTMLElement;
  const productName = (targetProduct.querySelector('span') as HTMLElement).innerText.toLowerCase().trim();

  const stockedProductNameElems = stockedList.querySelectorAll('.product');
  const stockedProductNames: string[] = [];
  stockedProductNameElems.forEach(elem => {
    stockedProductNames.push((elem as HTMLElement).innerText.trim().toLowerCase());
  });
  if (stockedProductNames.includes(productName)) {
    shoppingList?.removeChild(targetProduct);
    checkIfEmpty(shoppingList);
  } else {
    shoppingList?.removeChild(targetProduct);
    addToList(productName, stockedList);

    checkIfEmpty(shoppingList);
    checkIfEmpty(stockedList);

    const userObject = JSON.parse(localStorage.getItem('user') || 'null') as IUserResponse;

    if (userObject?.products) {
      if (!userObject.products.own.includes(productName)) {
        userObject.products.own.push(productName);
        userObject.products.shopping = userObject.products.shopping.filter(str => str !== productName);
      }
    } else {
      userObject.products = { shopping: [], own: [] };
      userObject.products.own.push(productName);
    }
    localStorage.setItem('user', JSON.stringify(userObject));
  }
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
