import '../../styles/main.scss';
import * as Controller from './controller';

const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const recipeId = parseInt(params.get('id') as string);

Controller.loadRecipe(recipeId);