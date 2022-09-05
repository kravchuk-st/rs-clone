import { tabHandler } from './tabs';

const userpageControlsHandler = (): void => {
  const userpageControlsHolder = document.getElementById('userpage-controls') as HTMLElement;
  const userpageControls = userpageControlsHolder.querySelectorAll('.tabs-btn');
  const pageContents = document.querySelectorAll('.tabs');

  userpageControls.forEach(control => {
    control.addEventListener('click', () => {
      userpageControls.forEach(el => {
        el.classList.remove('btn-active');
      });
      control.classList.add('btn-active');
      const activeContentId = control?.getAttribute('data-link-to') as string;
      showActiveContent(activeContentId);
    });
  });

  function showActiveContent(activeContentId: string): void {
    pageContents.forEach(content => {
      content.id === activeContentId ? content.classList.remove('hidden') : content.classList.add('hidden');
      tabHandler(content.id);
    });
  }
};

export default userpageControlsHandler;
