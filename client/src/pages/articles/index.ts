import { burgerMenu } from '../../features/burgerMenu';
import selectHandler from '../../features/selector';
import '../../styles/main.scss';
import { articlesLoadConfigInit } from './config';
import * as Controller from './controller';
import { getUserName } from '../../helpers/manageUserName';

Controller.loadArticlesPage(articlesLoadConfigInit).then(() => Controller.addListeners());
burgerMenu();
selectHandler();
getUserName();
