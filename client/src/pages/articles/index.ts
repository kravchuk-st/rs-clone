import { burgerMenu } from '../../features/burgerMenu';
import selectHandler from '../../features/selector';
import '../../styles/main.scss';
import { articlesLoadConfigInit } from './config';
import * as Controller from './controller';
import { getUserName } from '../../helpers/manageUserName';
import { tabHandler } from '../../features/tabs';
import popupHandler from '../../features/popup';

Controller.loadArticlesPage(articlesLoadConfigInit).then(() => Controller.addListeners());
burgerMenu();
selectHandler();
getUserName();
popupHandler();
tabHandler('forms-container');
