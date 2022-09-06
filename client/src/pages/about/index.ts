import '../../styles/main.scss';
import { tabHandler } from '../../features/tabs';
import { getUserName } from '../../helpers/manageUserName';
import popupHandler from '../../features/popup';

getUserName();
popupHandler();
tabHandler('forms-container');
