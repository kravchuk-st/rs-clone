import '../../styles/main.scss';
import { tabHandler } from '../../features/tabs';
import { getUserName } from '../../helpers/manageUserName';
import popupHandler from '../../features/popup';
import { burgerMenu } from '../../features/burgerMenu';
import * as formHandler from '../../helpers/loginFormHandlers';

burgerMenu();
getUserName();
popupHandler();
formHandler.addUserButtonListener();
formHandler.addRegisterFormListener();
formHandler.addSignInFormListener();
tabHandler('forms-container');
