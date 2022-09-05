import { burgerMenu } from '../../features/burgerMenu';
import selectHandler from '../../features/selector';
import '../../styles/main.scss';
import { renderRangeFilters } from '../../features/range-filters';
import * as Controller from './controller';

renderRangeFilters();
burgerMenu();
selectHandler();
Controller.addFiltersEventListeners();
