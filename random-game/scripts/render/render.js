import { options } from '../game/options.js';
import { INITAL_ELEMENTS } from '../game/variables.js';
import { defineCanvas } from './defineCanvas.js';

const createTag = (tag, className, root) => {
  const element = document.createElement(tag);
  element.classList.add(className);

  root.append(element);

  return element;
};

const render = (root) => {
  INITAL_ELEMENTS.forEach((tag) => createTag(tag, tag, root));

  //TODO: add level selection
  const { expert } = options;
  const { cellsW, cellsH } = expert;

  defineCanvas(cellsW, cellsH);
};

export { createTag, render };
