function getUserName() {
  (document.querySelector('#user-name') as HTMLElement).textContent = window.localStorage.userName || 'User';
}

function setUserName(userName: string) {
  window.localStorage.userName = userName;
  (document.querySelector('#user-name') as HTMLElement).textContent = userName;
}

export { getUserName, setUserName };
