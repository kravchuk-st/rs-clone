import createElementWithClass from '../helpers/createElementWithClass';
import capitalize from '../helpers/capitalize';
import checkItemInUserLists from '../helpers/checkItemInUserLists';
import { IArticle, ILoadArticleCard, ILoadRecipeCard, IRecipe, IUserResponse } from '../types';

function renderRecipeCard(
  recipeData: IRecipe,
  size: 'normal' | 'large',
  classList: string[],
  elemType: string,
  userObject: IUserResponse | null
): HTMLElement {
  const dishType = capitalize(recipeData.dishTypes[0]) || '';
  const calories = Math.round(recipeData.nutrition.nutrients[0].amount);
  const cardId = String(recipeData.id);
  const cardLink = `./recipe.html?id=${cardId}`;
  const [isInSavedList, isInFavoritesList] = checkItemInUserLists(userObject, 'recipes', cardId);

  const cardElementClassNames = size === 'normal' ? classList.concat('card') : classList.concat(['card', 'card_lg']);
  const cardElement = createElementWithClass(elemType, ...cardElementClassNames) as HTMLLIElement;
  cardElement.id = cardId;
  cardElement.innerHTML = `
    <div class="card__header">
      <p class="card__dish">${dishType}</p>
      <div class="recipe__btns">
        <button class="save-recipe btn-reset save-btn"></button>
        <button class="favorite-recipe btn-reset favorite-btn"></button>
      </div>
    </div>
    <a class="card__img" href="${cardLink}">
      <img class="card__img" src=${recipeData.image} alt=${recipeData.title}>
    </a>
    <a class="card-anchor" href=${cardLink}>
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
    </a>
  `;

  if (isInSavedList) {
    (cardElement.querySelector('.save-recipe') as HTMLButtonElement).classList.add('is-active');
  }
  if (isInFavoritesList) {
    (cardElement.querySelector('.favorite-recipe') as HTMLButtonElement).classList.add('is-active');
  }

  return cardElement;
}

function renderArticleCard(
  articleData: IArticle,
  articleClass: string[],
  userObject: IUserResponse | null
): HTMLElement {
  const date = new Date(articleData.postedAt).toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const cardId = String(articleData._id);
  const articleLink = `./article.html?id=${cardId}`;
  const [isInSavedList, isInFavoritesList] = checkItemInUserLists(userObject, 'articles', cardId);

  const articleElement = createElementWithClass('article', ...articleClass) as HTMLElement;
  articleElement.id = articleData._id;
  articleElement.innerHTML = `
    <img class="article__img" src=${articleData.image} alt="article preview">
    <div class="article__content">
      <div class="article__header">
        <time class="article__date" datetime=${articleData.postedAt}>${date}</time>
        <div class="article__btns">
          <button class="save-article btn-reset save-btn"></button>
          <button class="favorite-article btn-reset favorite-btn"></button>
        </div>
      </div>
      <h3 class="article__title">${articleData.title}</h3>
      <p class="article__summary">${articleData.summary}</p>
      <a class="article__btn btn-reset" href=${articleLink}>contunue reading</a>
    </div>
  `;

  if (isInSavedList) {
    (articleElement.querySelector('.save-article') as HTMLButtonElement).classList.add('is-active');
  }
  if (isInFavoritesList) {
    (articleElement.querySelector('.favorite-article') as HTMLButtonElement).classList.add('is-active');
  }

  return articleElement;
}

function renderItems(
  itemsData: IArticle[] | IRecipe[],
  loadConfig: ILoadRecipeCard | ILoadArticleCard,
  userObject: IUserResponse | null
) {
  return itemsData.map((item, itemIndex) => {
    if ('largeCardIndex' in loadConfig) {
      const size = itemIndex === loadConfig.largeCardIndex ? 'large' : 'normal';
      return renderRecipeCard(item as IRecipe, size, loadConfig.cardClassList, loadConfig.listElemType, userObject);
    }

    return renderArticleCard(item as IArticle, loadConfig.articleClassList, userObject);
  });
}

function renderCards(
  itemsData: IArticle[] | IRecipe[],
  loadConfig: ILoadRecipeCard | ILoadArticleCard,
  userObject: IUserResponse | null
) {
  const sectionContainer = document.querySelector(`.${loadConfig.containerClass}`) as HTMLElement;
  const sectionContainerList = sectionContainer.querySelector(`.${loadConfig.listClass}`) as HTMLUListElement;

  const itemsCards = renderItems(itemsData, loadConfig, userObject);

  sectionContainerList.append(...itemsCards);
}

export { renderRecipeCard, renderArticleCard, renderCards };
