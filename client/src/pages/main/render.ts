import createElementWithClass from '../../helpers/createElementWithClass';
import capitalize from '../../helpers/capitalize';
import { IRecipe } from '../../types';

import heartImg from '../../assets/svg/heart.svg';

function renderRecipeCard(recipeData: IRecipe, size: 'normal' | 'large'): HTMLElement {
  const dishType = capitalize(recipeData.dishTypes[0]) || '';
  const calories = recipeData.nutrition.nutrients[0].amount;

  const cardElementClassNames = size === 'normal' ? ['recipe__item', 'card'] : ['recipe__item', 'card', 'card_lg'];
  const cardElement = createElementWithClass('li', ...cardElementClassNames);
  cardElement.innerHTML = `
    <div class="card__header">
      <p class="card__dish">${dishType}</p>
      <object type="image/svg+xml" data=${heartImg} class="favorite"></object>
    </div>
    <img class="card__img" src=${recipeData.image} alt=${recipeData.title}>
    <div class="card__meta">
      <div class="data__time">
        <p class="time__title">Cook time</p>
        <p class="time__info">${recipeData.readyInMinutes} min</p>
      </div>
      <div class="data__calories">
        <p class="calories__title">Calories</p>
        <p class="calories__info">${calories} kcal</p>
      </div>
      <div class="data__rating">
        <p class="rating__title">Rating</p>
        <p class="rating__info">${recipeData.aggregateLikes}</p>
      </div>
    </div>
    <div class="card__body">
      <h3 class="card__title">${recipeData.title}</h3>
      <p class="card__text">${recipeData.summary}</p>
    </div>
  `;

  return cardElement;
}

export { renderRecipeCard };
