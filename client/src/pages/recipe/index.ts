import { burgerMenu } from '../../features/burgerMenu';
import '../../styles/main.scss';
import * as Controller from './controller';

burgerMenu();
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const recipeId = params.get('id') as string;

Controller.loadRecipe(recipeId).then(() => Controller.addListeners());
