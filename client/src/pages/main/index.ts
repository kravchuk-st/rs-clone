import { burgerMenu } from '../../features/burgerMenu';
import popupHandler from '../../features/popup';
import { slider } from '../../features/slider';
import '../../styles/main.scss';
import * as Controller from './controller';
import { getUserName } from '../../helpers/manageUserName';

burgerMenu();
slider;
Controller.loadMainPageContent().then(() => Controller.addListeners());
getUserName();
popupHandler();
