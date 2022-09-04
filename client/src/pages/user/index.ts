import { burgerMenu } from '../../features/burgerMenu';
import { tabHandler } from '../../features/tabs';
import { getUserData } from '../../api/userService';
import '../../styles/main.scss';
import * as Controller from './controller';
import { IArticleQueryOptions, IRecipeQueryOptions } from '../../types';

async function fetchUserData() {
  const userData = await getUserData();
  console.log(userData);

  if (userData !== undefined) {
    const initRecipesSavedQueryOptions: IRecipeQueryOptions = {
      page: 0,
      limit: 10,
      id: userData.recipes.saved,
    };

    const initRecipesFavoriteQueryOptions: IRecipeQueryOptions = {
      page: 0,
      limit: 10,
      id: userData.recipes.favorite,
    };

    const initArticlesSavedQueryOptions: IArticleQueryOptions = {
      page: 0,
      limit: 8,
      id: userData.articles.saved,
    };

    const initArticlesFavoriteQueryOptions: IArticleQueryOptions = {
      page: 0,
      limit: 8,
      id: userData.articles.favorite,
    };

    const recipesLoadConfig = {
      saved: {
        containerClass: 'tabs-content',
        listClass: 'recipes__list',
        listElemType: 'a',
        cardClassList: ['recipe__item'],
        queryOptions: initRecipesSavedQueryOptions,
        largeCardIndex: -1,
      },
      favorite: {
        containerClass: 'tabs-content',
        listClass: 'recipes__list',
        listElemType: 'a',
        cardClassList: ['recipe__item'],
        queryOptions: initRecipesFavoriteQueryOptions,
        largeCardIndex: -1,
      },
    };

    const articlesLoadConfig = {
      saved: {
        containerClass: 'articles',
        listClass: 'articles__list',
        articleClassList: ['article'],
        queryOptions: initArticlesSavedQueryOptions,
      },
      favorite: {
        containerClass: 'articles',
        listClass: 'articles__list',
        articleClassList: ['article'],
        queryOptions: initArticlesFavoriteQueryOptions,
      },
    };

    Controller.loadPageContent(recipesLoadConfig, articlesLoadConfig).then(() => Controller.addListeners());
  }
}

fetchUserData();

burgerMenu();
tabHandler();
