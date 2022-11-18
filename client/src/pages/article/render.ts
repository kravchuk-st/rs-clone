import { IArticle, IRecipe, IUserResponse } from '../../types';
import createElementWithClass from '../../helpers/createElementWithClass';
import { renderRecipeCard } from '../../features/renderCards';
import { renderList } from '../recipe/render';
import checkItemInUserLists from '../../helpers/checkItemInUserLists';

function renderArticle(articleData: IArticle, userObject: IUserResponse | null) {
  const main = document.querySelector('#main') as HTMLElement;
  const articleContainer = document.createElement('section');

  const date = new Date(articleData.postedAt).toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const cardId = String(articleData._id);
  const [isInSavedList, isInFavoritesList] = checkItemInUserLists(userObject, 'articles', cardId);
  const articleCategoriesList = renderList(articleData.category, 'categories__item');
  const paragraphsList = renderList(articleData.body, 'article__text');

  articleContainer.innerHTML = `
    <div class="container article-container" id=${cardId}>
      <div class="article__btns">
        <button class="article__btn_favorite btn_outlined btn-reset favorite-btn">Add to favorite articles</button>
        <button class="article__btn_save btn_outlined btn-reset save-btn">Save for later</button>
      </div>
      <h1 class="article-main__title">${articleData.title}</h1>
      <img class="article-main__img" src=${articleData.image} alt="article img">
      <div class="article__meta">
        <time class="article__date" datetime=${articleData.postedAt}>${date}</time>
        <ul class="article__categories list-reset">
          ${articleCategoriesList?.innerHTML}
        </ul>
      </div>
      <div class="article__descr">
        ${paragraphsList?.innerHTML}
      </div>
    </div>
  `;

  if (isInSavedList) {
    (articleContainer.querySelector('.save-btn') as HTMLButtonElement).classList.add('is-active');
  }
  if (isInFavoritesList) {
    (articleContainer.querySelector('.favorite-btn') as HTMLButtonElement).classList.add('is-active');
  }

  main.appendChild(articleContainer);
}

function renderRelevantRecipes(recipesData: IRecipe[], userObject: IUserResponse | null) {
  const main = document.querySelector('#main') as HTMLElement;
  const recipesContainer = createElementWithClass('section', 'relevant-recipes');

  recipesContainer.innerHTML = `
    <div class="container">
      <h2 class="relevant-recipes__title">Relevant recipes</h2>
      <ul class="relevant-recipes__list list-reset">
      </ul>
    </div>
  `;

  const recipesList = recipesContainer.querySelector('.relevant-recipes__list') as HTMLUListElement;

  const recipesCards = recipesData.map(recipe =>
    renderRecipeCard(recipe, 'normal', ['recipe__item'], 'li', userObject)
  );

  recipesList.append(...recipesCards);
  main.appendChild(recipesContainer);
}

export { renderArticle, renderRelevantRecipes };
