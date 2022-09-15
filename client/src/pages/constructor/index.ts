import { burgerMenu } from '../../features/burgerMenu';
import '../../styles/main.scss';
import { EMPTY_MESSAGE, MOCK_INGREDIENTS } from '../../constants';
import { getUserName } from '../../helpers/manageUserName';
import { tabHandler } from '../../features/tabs';
import popupHandler from '../../features/popup';
import * as Controller from './controller';

const dropdownIngredients = MOCK_INGREDIENTS;
const chosenList = [] as string[];

const boxEmptyMessageElement = document.getElementById('is-empty-message') as HTMLElement;
boxEmptyMessageElement.innerText = EMPTY_MESSAGE;

burgerMenu();
Controller.showBoxIsEmptyMessage();
getUserName();
popupHandler();
tabHandler('forms-container');
Controller.addConstructorListeners(dropdownIngredients, chosenList);

Controller.renderIngredientOptions(MOCK_INGREDIENTS);
