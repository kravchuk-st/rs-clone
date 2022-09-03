import { burgerMenu } from '../../features/burgerMenu';
import loadArticle from './controller';
import '../../styles/main.scss';

const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const articleId = params.get('id') as string;

burgerMenu();
loadArticle(articleId);
