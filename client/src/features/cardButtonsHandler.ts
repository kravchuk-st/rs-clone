import { IUserResponse } from '../types';
import * as userService from '../api/userService';
import { ENDPOINTS } from '../config/api.config';

function handleSaveFavoriteButtons(cardElement: Element, cardCategory: 'articles' | 'recipes') {
  const saveButton = cardElement.querySelector('.save-btn') as HTMLButtonElement;
  const favoriteButton = cardElement.querySelector('.favorite-btn') as HTMLButtonElement;

  saveButton.addEventListener('click', (e: Event) => {
    const targetButton = e.target as HTMLButtonElement;
    targetButton.classList.toggle('is-active');
    const userObject = JSON.parse(localStorage.getItem('user') || 'null');
    if (userObject) updateUserResources(userObject, cardElement, targetButton, cardCategory, 'saved');
  });

  favoriteButton.addEventListener('click', (e: Event) => {
    const targetButton = e.target as HTMLButtonElement;
    targetButton.classList.toggle('is-active');
    const userObject = JSON.parse(localStorage.getItem('user') || 'null');
    if (userObject) updateUserResources(userObject, cardElement, targetButton, cardCategory, 'favorite');
  });
}

function updateUserResources(
  userObject: IUserResponse,
  cardElement: Element,
  eventTarget: HTMLButtonElement,
  cardName: 'articles' | 'recipes',
  cardCategory: 'saved' | 'favorite'
) {
  if (eventTarget.classList.contains('is-active')) {
    userObject[cardName][cardCategory].push(cardElement.id);
  } else {
    userObject[cardName][cardCategory] = userObject[cardName][cardCategory].filter(
      resourceId => resourceId !== cardElement.id
    );
  }
  userService.sendUserData(userObject, ENDPOINTS.userUpdate);
  localStorage.setItem('user', JSON.stringify(userObject));
}

export { handleSaveFavoriteButtons, updateUserResources };
