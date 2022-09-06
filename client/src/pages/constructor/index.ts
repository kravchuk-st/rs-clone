import { burgerMenu } from '../../features/burgerMenu';
import createElemWithClass from '../../helpers/createElementWithClass';
import '../../styles/main.scss';
import { EMPTY_MESSAGE, MOCK_INGREDIENTS } from '../../constants';
import * as formHandler from '../../helpers/loginFormHandlers';
import { getUserName } from '../../helpers/manageUserName';
import { tabHandler } from '../../features/tabs';
import popupHandler from '../../features/popup';
import { IUserResponse } from '../../types';

let dropdownIngredients = MOCK_INGREDIENTS;

const constructorInput = document.getElementById('constructor-input') as HTMLInputElement;
const dropdownMenu = document.querySelector('.ingredient-options') as HTMLElement;
const optionsHolder = document.getElementById('relevant-options') as HTMLElement;
const chosenIngredientsBox = document.getElementById('chosen-ingredients') as HTMLElement;
const boxEmptyMessageElement = document.getElementById('is-empty-message') as HTMLElement;
const addProductsBtn = document.getElementById('add-from-list') as HTMLElement;

boxEmptyMessageElement.innerText = EMPTY_MESSAGE;

burgerMenu();
showBoxIsEmptyMessage();
getUserName();
popupHandler();
tabHandler('forms-container');
formHandler.addUserButtonListener();
formHandler.addRegisterFormListener();
formHandler.addSignInFormListener();

renderIngredientOptions(MOCK_INGREDIENTS);

chosenIngredientsBox.addEventListener('click', e => {
  const target = e.target as HTMLElement;
  if (target.classList.contains('constructor-ingredient__delete')) {
    const chosenElem = (e.target as HTMLElement).closest('.constructor-ingredient');
    if (chosenElem) {
      removeIngredientFromChosen(chosenElem);
      addIngredientToOptions(chosenElem);
    }
  }

  if (chosenIngredientsBox.querySelectorAll('.constructor-ingredient').length === 0) {
    showBoxIsEmptyMessage();
  } else {
    removeBoxIsEmptyMessage();
  }
});

constructorInput.addEventListener('click', () => {
  renderIngredientOptions(dropdownIngredients);
  dropdownMenu.classList.add('is-active');
});

constructorInput.addEventListener('input', () => {
  dropdownMenu.classList.add('is-active');
  const relevantIngredients = filterOptions(dropdownIngredients, constructorInput.value.trim().toLocaleLowerCase());
  relevantIngredients.length ? renderIngredientOptions(relevantIngredients) : renderMessage('Sorry, nothing matches');
});

document.body.addEventListener('click', e => {
  const target = e.target as HTMLElement;
  if (!target.classList.contains('ingredient-options__item') && target.id !== 'constructor-input') {
    dropdownMenu.classList.remove('is-active');
  }
});

constructorInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    moveIngredientToChosen(constructorInput.value);
  }
});

optionsHolder.addEventListener('click', e => {
  const target = e.target as HTMLElement;
  if (target.classList.contains('ingredient-options__item')) {
    moveIngredientToChosen(target.innerText);
  }
});

addProductsBtn.addEventListener('click', addUsersProducts);

function renderIngredientOptions(options: string[]): void {
  optionsHolder.innerHTML = '';
  options.forEach(item => {
    const listElem = createElemWithClass('li', 'ingredient-options__item');
    listElem.id = item;
    listElem.innerText = item;
    optionsHolder.append(listElem);
  });
}

function renderMessage(message: string): void {
  optionsHolder.innerText = message;
}

function filterOptions(options: string[], value: string) {
  return options.filter(item => item.includes(value));
}

function addIngredientToChosen(ingredient: string): void {
  const ingredientEl = createElemWithClass('div', 'constructor-ingredients__item', 'constructor-ingredient');
  ingredientEl.innerHTML = `
    <span class="constructor-ingredient__name">${ingredient}</span>
    <div class="constructor-ingredient__delete"></div>
  `;
  chosenIngredientsBox.append(ingredientEl);
}

function moveIngredientToChosen(str: string): void {
  const ingredient = str.trim().toLowerCase();
  if (MOCK_INGREDIENTS.includes(ingredient)) {
    addIngredientToChosen(ingredient);
    removeBoxIsEmptyMessage();
  }
  dropdownIngredients = dropdownIngredients.filter(item => item !== ingredient);
  constructorInput.value = '';
  renderIngredientOptions(dropdownIngredients);
  constructorInput.focus();
}

function removeIngredientFromChosen(elem: Element): void {
  chosenIngredientsBox.removeChild(elem);
}

function addIngredientToOptions(elem: Element): void {
  const chosenElemName = (elem.querySelector('.constructor-ingredient__name') as HTMLElement).innerText;
  dropdownIngredients.push(chosenElemName);
  dropdownIngredients.sort();
}

function showBoxIsEmptyMessage() {
  boxEmptyMessageElement.classList.remove('hidden');
}

function removeBoxIsEmptyMessage() {
  boxEmptyMessageElement.classList.add('hidden');
}

function addUsersProducts() {
  const userObject = JSON.parse(localStorage.getItem('user') || 'null') as IUserResponse;
  const alreadyAddedProductElems = chosenIngredientsBox.querySelectorAll('.constructor-ingredient__name');
  const alreadyAddedProducts: string[] = [];
  alreadyAddedProductElems.forEach(el => {
    alreadyAddedProducts.push((el as HTMLElement).innerText);
  });
  if (userObject) {
    userObject.products.own.forEach(product => {
      if (!alreadyAddedProducts.includes(product)) {
        moveIngredientToChosen(product);
      }
    });
  }
}
