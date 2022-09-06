import { burgerMenu } from '../../features/burgerMenu';
import '../../styles/main.scss';
import * as Controller from './controller';
import { getUserName } from '../../helpers/manageUserName';
import { tabHandler } from '../../features/tabs';
import popupHandler from '../../features/popup';

burgerMenu();
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const recipeId = params.get('id') as string;

Controller.loadRecipe(recipeId).then(() => Controller.addListeners());
getUserName();
popupHandler();
tabHandler('forms-container');
