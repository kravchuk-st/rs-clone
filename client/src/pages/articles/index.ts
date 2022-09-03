import { burgerMenu } from '../../features/burgerMenu';
import selectHandler from '../../features/selector';
import '../../styles/main.scss';
import { loadArticlesPage, addListeners } from './controller';

loadArticlesPage().then(() => addListeners());
burgerMenu();
selectHandler();
