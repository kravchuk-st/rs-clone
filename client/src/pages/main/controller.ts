import { renderRecipeCard, renderArticleCard } from './render';
import * as recipesSerivice from '../../api/recipesService';
import * as articlesService from '../../api/articlesService';
import getCookieValue from '../../helpers/getCookieValue';

import { ILoadArticleCard, ILoadRecipeCard, IArticle, IRecipe } from '../../types';
import { recipesLoadConfig, articlesLoadConfig } from './config';
import { BASE_URL, ENDPOINTS } from '../../config/api.config';

async function loadMainPageContent() {
  await loadContent(recipesLoadConfig.popular, recipesSerivice.getRecipes);
  await loadContent(articlesLoadConfig, articlesService.getArticles);
  await loadContent(recipesLoadConfig.breakfast, recipesSerivice.getRecipes);
  await loadContent(recipesLoadConfig.lunch, recipesSerivice.getRecipes);
  await loadContent(recipesLoadConfig.dinner, recipesSerivice.getRecipes);
  await loadContent(recipesLoadConfig.bakery, recipesSerivice.getRecipes);
}

async function loadContent(
  loadConfig: ILoadRecipeCard | ILoadArticleCard,
  contentLoadingService: typeof articlesService.getArticles | typeof recipesSerivice.getRecipes
) {
  const sectionContainer = document.querySelector(`.${loadConfig.containerClass}`) as HTMLElement;
  const sectionContainerList = sectionContainer.querySelector(`.${loadConfig.listClass}`) as HTMLUListElement;

  const itemsData = await contentLoadingService(loadConfig.queryOptions);
  const itemsCards = renderItems(itemsData, loadConfig);

  sectionContainerList.append(...itemsCards);
}

function renderItems(itemsData: IArticle[] | IRecipe[], loadConfig: ILoadRecipeCard | ILoadArticleCard) {
  return itemsData.map((item, itemIndex) => {
    if ('largeCardIndex' in loadConfig) {
      const size = itemIndex === loadConfig.largeCardIndex ? 'large' : 'normal';
      return renderRecipeCard(item as IRecipe, size, loadConfig.cardClassList, loadConfig.listElemType);
    }

    return renderArticleCard(item as IArticle, loadConfig.articleClassList);
  });
}

function addListeners() {
  addUserButtonListener();
  // addRegisterButtonListener();
  // addSignInButtonListener();
}

function addUserButtonListener() {
  const userProfileButton = document.querySelector('.profile-btn') as HTMLButtonElement;
  const signupForm = document.querySelector('.popup') as HTMLElement;
  const tokenValue = getCookieValue('token');

  userProfileButton.addEventListener('click', async () => {
    if (tokenValue) {
      const response = await fetch(`${BASE_URL}${ENDPOINTS.userProfile}`);
      if (response.status === 200) {
        const userId = response.user.id;
        window.open(`${window.location.host}/user-page.html/?id=${userId}`, '_self');
      } else {
        signupForm.classList.add('is-open');
      }
    } else {
      signupForm.classList.add('is-open');
    }
  });
}

export { loadMainPageContent, addListeners };
