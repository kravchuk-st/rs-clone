import popupHandler from '../../features/popup';
import { slider } from '../../features/slider';
import { tabHandler } from '../../features/tabs';
import '../../styles/main.scss';
import * as Controller from './controller';

slider;
Controller.loadMainPageContent();
tabHandler();
popupHandler();
