import { slider } from '../../features/slider';
import { tabHandler } from '../../features/tabs';
import '../../styles/main.scss';
import * as Controller from './controller';

slider;
tabHandler();
Controller.loadRecipes();
