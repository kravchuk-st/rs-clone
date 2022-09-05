import getCookieValue from './getCookieValue';
import { BASE_URL, ENDPOINTS } from '../config/api.config';
import { IUserResponse } from '../types';
import { setUserName } from './manageUserName';

function setLocalUser(response: IUserResponse) {
  window.localStorage.setItem('user', JSON.stringify(response));
}

function addUserButtonListener() {
  const userProfileButton = document.querySelector('.profile-btn') as HTMLButtonElement;
  const signupForm = document.querySelector('.popup') as HTMLElement;

  userProfileButton.addEventListener('click', async () => {
    const tokenValue = getCookieValue('token');

    if (tokenValue) {
      const response = (await fetch(`${BASE_URL}${ENDPOINTS.userProfile}`, {
        credentials: 'include',
      })) as IUserResponse;
      if (response.status === 200) {
        const responseBody = (await response.json()) as IUserResponse;
        setLocalUser(responseBody);
        window.open('/user-page.html', '_self');
      } else {
        signupForm.classList.add('is-open');
      }
    } else {
      signupForm.classList.add('is-open');
    }
  });
}

function addRegisterFormListener() {
  const form = document.forms[1] as HTMLFormElement;
  form.addEventListener('submit', handleRegistrationForm);
}

function addSignInFormListener() {
  const form = document.forms[0] as HTMLFormElement;
  form.addEventListener('submit', handleLoginForm);
}

async function handleRegistrationForm(event: Event) {
  event.preventDefault();
  const formElement = event.target as HTMLFormElement;
  const formData = serializeRegistrationForm(event.target as HTMLFormElement);

  if (formData !== undefined) {
    const response = await sendUserData(formData, ENDPOINTS.userRegister);
    if (response.status === 400) {
      (formElement.querySelector('#user-exist') as HTMLElement).classList.remove('hidden');
    } else {
      (document.querySelector('.popup') as HTMLElement).classList.remove('is-open');
      alert('Registered successfully!');
      formElement.reset();
      const responseBody = (await response.json()) as IUserResponse;
      setLocalUser(responseBody);
      setUserName(responseBody.name);
    }
  }
}

async function handleLoginForm(event: Event) {
  event.preventDefault();
  const formElement = event.target as HTMLFormElement;
  const formData = serializeLoginForm(event.target as HTMLFormElement);

  const response = await sendUserData(formData, ENDPOINTS.userLogin);
  switch (response.status) {
    case 401:
      (formElement.querySelector('#wrong-password') as HTMLElement).classList.remove('hidden');
      (formElement.querySelector('#user-not-found') as HTMLElement).classList.add('hidden');
      break;
    case 404:
    case 500:
      (formElement.querySelector('#user-not-found') as HTMLElement).classList.remove('hidden');
      (formElement.querySelector('#wrong-password') as HTMLElement).classList.add('hidden');
      break;
    case 200: {
      (document.querySelector('.popup') as HTMLElement).classList.remove('is-open');
      alert('Logged in successfully!');
      formElement.reset();
      const responseBody = (await response.json()) as IUserResponse;
      setLocalUser(responseBody);
      setUserName(responseBody.name);
    }
  }
}

function serializeRegistrationForm(formNode: HTMLFormElement): FormData | undefined {
  const password = formNode.password.value;
  const passwordConfirm = formNode['password-confirm'].value;
  if (password !== passwordConfirm) {
    (formNode.querySelector('#password-mismatch') as HTMLElement).classList.remove('hidden');
  } else {
    (formNode.querySelector('#password-mismatch') as HTMLFormElement).classList.add('hidden');
    (formNode.querySelector('#user-exist') as HTMLFormElement).classList.add('hidden');
    return new FormData(formNode);
  }
}

function serializeLoginForm(formNode: HTMLFormElement): FormData {
  return new FormData(formNode);
}

async function sendUserData(data: FormData, endpoint: string): Promise<IUserResponse> {
  return (await fetch(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(Object.fromEntries(data.entries())),
  })) as IUserResponse;
}

export { addUserButtonListener, addRegisterFormListener, addSignInFormListener };
