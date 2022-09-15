import { burgerMenu } from '../../features/burgerMenu';
import { tabHandler } from '../../features/tabs';
import '../../styles/main.scss';
import * as Controller from './controller';
import * as Render from './render';
import { ILoadUserArticles, ILoadUserRecipes } from '../../types';
import { getUserName } from '../../helpers/manageUserName';
import popupHandler from '../../features/popup';
import addListenersToUserInput from '../../features/productListInputHandler';
import { renderListsFromLStorage } from '../../features/productHandlerHelpers';
import { MOCK_INGREDIENTS } from '../../constants';

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
popupHandler();
tabHandler('recipes');
tabHandler('forms-container');

const dropdownProductsNeeded = MOCK_INGREDIENTS.slice();
const dropdownProductsStocked = MOCK_INGREDIENTS.slice();

renderListsFromLStorage(dropdownProductsStocked, dropdownProductsNeeded);
addListenersToUserInput('products-needed', dropdownProductsNeeded, dropdownProductsStocked);
addListenersToUserInput('products-stocked', dropdownProductsStocked, dropdownProductsNeeded);
