import { db } from '../db/db.js';
import { options } from '../game/options.js';
import { INITAL_ELEMENTS, INITIAL_GAME_MODE, LOCAL_STORAGE_KEY } from '../game/variables.js';
import { createTag } from '../helpers/createTag.js';
import { defineCanvas } from './defineCanvas.js';

const renderFooter = () => {
  const footer = document.querySelector('.footer');
  const innerElements = `
      <a class="github" href="https://github.com/Disembow"></a>
      <p>2023</p>
      <a class="rsschool" href="https://rs.school/js-stage0/"></a>
    `;

  footer.insertAdjacentHTML('afterbegin', innerElements);
};

const renderHeader = () => {
  const header = document.querySelector('.header');
  const innerElements = `
    <div class="header__container">
      <h1 class="title">Minesweeper</h1>
      <div class="mods__container">
        <span class="mods__item beginner">Beginner</span>
        <span class="mods__item intermediate">Intermediate</span>
        <span class="mods__item expert">Expert</span>
        <span class="mods__item custom">Custom</span>
      </div>
    </div>
  `;

  header.insertAdjacentHTML('afterbegin', innerElements);

  const mods = document.querySelector('.mods__container');
  mods.addEventListener('click', ({ target }) => {
    document.querySelector('.active').classList.remove('active');

    target.classList.add('active');

    const newMode = target.textContent.toLowerCase();
    setGameModeToLocalStorage(newMode);

    const canvas = document.querySelector('.canvas');
    canvas.remove();
    changeGameMode();
  });
};

const changeGameMode = () => {
  const gameMode = getGameModeFromLocalStorage();
  const gameModeElement = document.querySelector(`.${gameMode}`);
  gameModeElement.classList.add('active');

  db.gameMode = gameMode;
  const { cellsW, cellsH } = options[db.gameMode];
  defineCanvas(cellsW, cellsH);
};

const setGameModeToLocalStorage = (mode = INITIAL_GAME_MODE) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, mode);
};

const getGameModeFromLocalStorage = () => {
  const gameMode = localStorage.getItem(LOCAL_STORAGE_KEY);

  db.gameMode = gameMode;

  return gameMode;
};

const render = (root) => {
  let gameMode = getGameModeFromLocalStorage();

  if (!gameMode) {
    setGameModeToLocalStorage();
    gameMode = INITIAL_GAME_MODE;
  }

  const { cellsW, cellsH } = options[gameMode];

  INITAL_ELEMENTS.forEach((tag) => createTag(tag, tag, root));

  renderFooter();
  renderHeader();
  changeGameMode();

  defineCanvas(cellsW, cellsH);
};

export { createTag, render };
