import { burgerMenu } from '../../features/burgerMenu';
import * as Controller from './controller';
import '../../styles/main.scss';

const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const articleId = params.get('id') as string;

burgerMenu();
Controller.loadArticle(articleId).then(() => Controller.addListeners());
