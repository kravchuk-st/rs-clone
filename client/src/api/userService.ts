import getCookieValue from '../helpers/getCookieValue';
import { BASE_URL, ENDPOINTS } from '../config/api.config';
import { IUserResponse } from '../types';
import { setUserName } from '../helpers/manageUserName';

const getUserData = async (): Promise<IUserResponse | undefined> => {
  const tokenValue = getCookieValue('token');
  const signupForm = document.querySelector('.popup') as HTMLElement;

  if (tokenValue) {
    const response = (await fetch(`${BASE_URL}${ENDPOINTS.userProfile}`, {
      credentials: 'include',
    })) as IUserResponse;
    if (response.status === 200) {
      return (await response.json()) as IUserResponse;
    } else {
      signupForm.classList.add('is-open');
    }
  } else {
    signupForm.classList.add('is-open');
  }
};

async function sendUserData(data: FormData, endpoint: string): Promise<IUserResponse> {
  return (await fetch(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(Object.fromEntries(data.entries())),
  })) as IUserResponse;
}

export { getUserData };
