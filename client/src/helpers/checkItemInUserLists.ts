import { IUserResponse } from '../types';

function checkItemInUserLists(userObject: IUserResponse | null, listName: 'recipes' | 'articles', itemId: string) {
  if (!userObject) return [false, false];

  const isInSavedList = userObject[listName].saved.find(id => id === itemId);
  const isInFavoritesList = userObject[listName].favorite.find(id => id === itemId);

  return [!!isInSavedList, !!isInFavoritesList];
}

export default checkItemInUserLists;
