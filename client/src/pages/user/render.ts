import avatarImage from '../../assets/svg/avatar.svg';
import { IUserResponse } from '../../types';

function renderUserCard(userData: IUserResponse | undefined) {
  const container = document.querySelector('.profile') as HTMLElement;
  container.innerHTML = `
    <div class="profile__general">
      <div class="profile__avatar">
        <img class="avatar__img" src=${avatarImage} alt="avatar image">
      </div>
      <h1 class="profile__name">${userData?.name || 'User'}</h1>
      <span class="profile__motto">I just love cooking and sharing my experience!</span>
    </div>
    <div class="profile__info">
      <div class="info__item">Age: <span id="user-age">28</span></div>
      <div class="info__item">Location: <span id="user-location">New-York</span></div>
      <div class="info__item">
        <div class="interests">Cooking interests:</div> 
        <div class="categories" id="fav-categories">
          <div class="categories__item">Bakery</div>
          <div class="categories__item">Vegan</div>
          <div class="categories__item">Dinner</div>
          <div class="categories__item">Healthy</div>
        </div>
      </div>
    </div>
  `;

  return container;
}

export { renderUserCard };
