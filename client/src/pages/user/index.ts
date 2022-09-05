import { burgerMenu } from '../../features/burgerMenu';
import { tabHandler } from '../../features/tabs';
import '../../styles/main.scss';
import * as Controller from './controller';
import * as Render from './render';
import { ILoadUserArticles, ILoadUserRecipes } from '../../types';
import { getUserName } from '../../helpers/manageUserName';
import popupHandler from '../../features/popup';
import productListControlsHandler from '../../features/productListControlsHandler';
import '../../features/productListInputHandler';
import userpageControlsHandler from '../../features/userpageButtonHandlers';

Controller.fetchUserData()
  .then(userData => {
    Render.renderUserCard(userData);
    return Controller.createQueryConfigs(userData);
  })
  .then(configs => {
    if (configs) {
      const recipesLoadConfig = configs[0] as ILoadUserRecipes;
      const articlesLoadConfig = configs[1] as ILoadUserArticles;
      Controller.loadPageContent(recipesLoadConfig, articlesLoadConfig).then(() => Controller.addListeners());
    }
  });

getUserName();
burgerMenu();
// tabHandler('recipes');
popupHandler();
userpageControlsHandler();
productListControlsHandler();
