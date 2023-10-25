const createTag = (tag, className, root) => {
  const element = document.createElement(tag);
  element.classList.add(className);

  root.append(element);

  return element;
};

export { createTag };
