import createElementWithClass from '../../helpers/createElementWithClass';

function renderRecipeCard(): HTMLElement {
  const cardElement = createElementWithClass('li', 'recipe__item', 'card');
  cardElement.innerHTML = `
    <div class="card__header">
      <p class="card__dish">Main dish</p>
      <object type="image/svg+xml" data="../assets/svg/hard.svg" class="favorite"></object>
    </div>
    <img class="card__img" src="../assets/meal.jpg" alt="...">
    <div class="card__meta">
      <div class="data__time">
        <p class="time__title">Cook time</p>
        <p class="time__info">60 min</p>
      </div>
      <div class="data__calories">
        <p class="calories__title">Calories</p>
        <p class="calories__info">425 ccal</p>
      </div>
      <div class="data__rating">
        <p class="rating__title">Rating</p>
        <p class="rating__info">125</p>
      </div>
    </div>
    <div class="card__body">
      <h3 class="card__title">Pepperoni</h3>
      <p class="card__text">
        This awesome crispy pizza is something you have always wanted to cook but never had a right time, so it is very easy to start and hard to finish, but definitely worth eating!
      </p>
    </div>
  `;

  return cardElement;
}

export { renderRecipeCard };
