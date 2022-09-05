export const tabHandler = (id: string): void => {
  const tabNavs: NodeListOf<HTMLElement> = (document.getElementById(id) as HTMLElement).querySelectorAll(
    '.tabs-nav__item'
  );
  const tabContents: NodeListOf<HTMLElement> = (document.getElementById(id) as HTMLElement).querySelectorAll(
    '.tabs-content__item'
  );
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
    const activeTab = (e.target as HTMLElement).classList.contains('tabs-nav__item')
      ? (e.target as HTMLElement)
      : (e.target as HTMLElement).closest('.tabs-nav__item');
    activeTab?.classList.add('is-active');
    tabContents.forEach(element => element.classList.remove('is-active'));
    activeTabName = activeTab?.getAttribute('data-tab-name') as string;
    showActiveTabContent(activeTabName);
  };
};
