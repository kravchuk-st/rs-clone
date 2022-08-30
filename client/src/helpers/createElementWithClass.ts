function createElemWithClass(tagName: string, ...classNames: string[]): HTMLElement {
  const createdElement = document.createElement(tagName);
  createdElement.classList.add(...classNames);

  return createdElement;
}

export default createElemWithClass;
