import { ILoadRecipePage, IIngredientMeta, INutrient, IUserResponse } from '../../types';
import createElementWithClass from '../../helpers/createElementWithClass';
import infoSvg from '../../assets/svg/info-circle.svg';
import round from '../../helpers/round';
import checkItemInUserLists from '../../helpers/checkItemInUserLists';

const PRICE_COEFFICIENT = 100;

function renderRecipe(recipeData: ILoadRecipePage, equipmentList: string[] | undefined) {
  const main = document.querySelector('#main') as HTMLElement;
  const recipeContainer = createElementWithClass('section', 'recipe');

  const list = renderIngredientsList(recipeData.extendedIngredients);
  const nutrients = renderNutrients(recipeData.nutrition.nutrients);
  const categories = renderList(recipeData.diets, 'category__item');
  const equipment = renderList(equipmentList, 'equipment__item');
  const servingCost = (recipeData.pricePerServing / PRICE_COEFFICIENT).toFixed(2);

  recipeContainer.innerHTML = `
    <div class="container">
      <h1 class="recipe__title">${recipeData.title}</h1>
      <div class="recipe__content">
        <div class="recipe__consist">
          <div class="recipe__ingredients">
            <div class="ingredients__header">
              <h3 class="ingredients__title">Ingredients</h3>
              <button class="ingredients__btn btn-reset" id="less-ingredients">-</button>
              <span class="ingredients__amount">${recipeData.servings}</span>
              <button class="ingredients__btn btn-reset" id="more-ingredients">+</button>
            </div>
            <ul class="ingredients__list list-reset">
              ${list.innerHTML}
            </ul>
            <button class="btn-active btn-reset">Add to my shopping list</button>
          </div>
          ${nutrients}
        </div>
        <div class="recipe__descr">
          <img class="recipe__img" src=${recipeData.image} alt=${recipeData.title}>
          <div class="recipe__info">
            <img class="info-icon" src=${infoSvg} alt="">
            <div class="info__main">
              <ul class="info__numbers list-reset">
                <li class="number__item">Cooking time:&nbsp; <span class="number_time">
                  ${recipeData.readyInMinutes} min</span>
                </li>
                <li class="number__item">Servings:&nbsp; <span class="number_servings">
                  ${recipeData.servings}</span>
                </li>
                <li class="number__item">Price per serving:&nbsp; <span class="number_price">$
                  ${servingCost}
                </span></li>
                <li class="number__item">Health score:&nbsp; <span class="number_health">
                  ${recipeData.healthScore}
                </span></li>
              </ul>
              <ul class="info__categories list-reset">
                ${categories?.innerHTML}
              </ul>
            </div>
            <div class="info__equipment">
              <span class="equipment__text">Equipment:</span>
              <ul class="equipment__list list-reset">
                ${equipment?.innerHTML || 'No equipment'}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  main.appendChild(recipeContainer);
}

function renderInstructions(instructions: string[], recipeId: string, userObject: IUserResponse) {
  const main = document.querySelector('#main') as HTMLElement;
  const instructionsContainer = createElementWithClass('section', 'instruction');

  const [isInSavedList, isInFavoritesList] = checkItemInUserLists(userObject, 'recipes', recipeId);

  const instructionsList = renderList(instructions, 'instruction__item');

  instructionsContainer.innerHTML = `
    <div class="container recipe-container" id=${recipeId}>
      <h3 class="instruction__title">Instructions</h3>
      <ol class="instruction__list">
        ${instructionsList?.innerHTML}
      </ol>
      <div class="instruction__btns">
        <button class="instruction__btn_favorite btn-active btn-reset favorite-btn">Add to favorite recipes</button>
        <button class="instruction__btn_save btn-active btn-reset save-btn">Save for later</button>
      </div>
    </div>
  `;

  if (isInSavedList) {
    (instructionsContainer.querySelector('.instruction__btn_save') as HTMLButtonElement).classList.add('is-active');
  }
  if (isInFavoritesList) {
    (instructionsContainer.querySelector('.instruction__btn_favorite') as HTMLButtonElement).classList.add('is-active');
  }

  main.appendChild(instructionsContainer);
}

function renderIngredientsList(ingredientsList: IIngredientMeta[]): HTMLElement {
  const instructionsList = document.createElement('div');

  const ingredients = ingredientsList.map((indredient, index) => {
    const listItem = createElementWithClass('li', 'ingredients__item');
    listItem.innerHTML = `
      <input type="checkbox" id="ingredient${index}" name="ingredient${index}">
      <label for="ingredient${index}">${indredient.original}</label>
    `;

    return listItem;
  });

  instructionsList.append(...ingredients);
  return instructionsList;
}

function renderNutrients(nutrients: INutrient[]): string {
  return `
  <div class="nutrients recipe__nutrients">
    <div class="nutrients__item">
      <p>Calories</p>
      <p class="nutrients__calories">${round(nutrients[0].amount)}</p>
    </div>
    <div class="nutrients__item">
      <p>Protein</p>
      <p class="nutrients__protein">${round(nutrients[8].amount)}g</p>
    </div>
    <div class="nutrients__item">
      <p>Fat</p>
      <p class="nutrients__fat">${round(nutrients[1].amount)}g</p>
    </div>
  </div>
  `;
}

function renderList(listItems: string[] | undefined, listItemClass: string): HTMLElement | null {
  if (listItems === undefined) return null;

  const list = document.createElement('div');

  const categories = listItems.map(item => {
    const listItem = createElementWithClass('li', listItemClass);
    listItem.innerHTML = item;

    return listItem;
  });

  list.append(...categories);
  return list;
}

export { renderRecipe, renderInstructions, renderList };
