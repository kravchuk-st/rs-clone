export const tabHandler = (): void => {
  const tabNavs: NodeListOf<HTMLElement> = document.querySelectorAll('.tabs-nav__item');
  const tabContents: NodeListOf<HTMLElement> = document.querySelectorAll('.tabs-content__item');
  let activeTabName = '';

  tabNavs.forEach(element => element.addEventListener('click', e => setActiveTab(e)));
  const showActiveTabContent = (tabname: string): void => {
    tabContents.forEach(element => {
      element.getAttribute('data-tab-content') === tabname
        ? element.classList.add('is-active')
        : element.classList.remove('is-active');
    });
  };
  const setActiveTab = (e: Event): void => {
    e.preventDefault();
    tabNavs.forEach(element => element.classList.remove('is-active'));
    (e.target as HTMLElement).classList.add('is-active');
    tabContents.forEach(element => element.classList.remove('is-active)'));
    activeTabName = (e.target as HTMLElement).getAttribute('data-tab-name') as string;
    showActiveTabContent(activeTabName);
  };
};
