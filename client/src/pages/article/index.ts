import '../../styles/main.scss';
import loadArticle from './controller';

const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const articleId = params.get('id') as string;

loadArticle(articleId);
