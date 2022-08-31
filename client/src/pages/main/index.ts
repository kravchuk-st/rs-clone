import { slider } from '../../features/slider';
import { tabHandler } from '../../features/tabs';
import '../../styles/main.scss';
import * as Controller from './controller';

slider;
Controller.loadRecipesMainPage();
tabHandler();
