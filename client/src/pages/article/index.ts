import { burgerMenu } from '../../features/burgerMenu';
import * as Controller from './controller';
import '../../styles/main.scss';
import { getUserName } from '../../helpers/manageUserName';

const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const articleId = params.get('id') as string;

burgerMenu();
Controller.loadArticle(articleId).then(() => Controller.addListeners());
getUserName();
