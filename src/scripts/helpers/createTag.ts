const createTag = (tag: string, className: string, root: HTMLElement): HTMLElement => {
  const element = document.createElement(tag);
  element.classList.add(className);

  root.append(element);

  return element;
};

export { createTag };
