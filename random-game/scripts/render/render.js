import { db } from '../db/db.js';
import { handleResultsTable } from '../game/handleMouseEvents.js';
import { INITAL_ELEMENTS, INITIAL_GAME_MODE } from '../game/variables.js';
import { createTag } from '../helpers/createTag.js';
import {
  getGameModeFromLocalStorage,
  setGameModeToLocalStorage,
} from '../helpers/localStoreage.js';
import { defineCanvas } from './defineCanvas.js';

const renderHeader = () => {
  const header = document.querySelector('.header');
  const innerElements = `
    <div class="header__container">
      <h1 class="title">Minesweeper</h1>
      <div class="modes__container">
        <span class="modes__item beginner">Beginner</span>
        <span class="modes__item intermediate">Intermediate</span>
        <span class="modes__item expert">Expert</span>
        <span class="modes__item custom">Custom</span>
      </div>
      <div class="modes__item results">Results</div>
    </div>
  `;

  header.insertAdjacentHTML('afterbegin', innerElements);

  const modes = document.querySelector('.modes__container');
  modes.addEventListener('click', ({ target }) => {
    document.querySelector('.active').classList.remove('active');

    target.classList.add('active');

    const newMode = target.textContent.toLowerCase();
    setGameModeToLocalStorage(newMode);

    const canvas = document.querySelector('.canvas');
    canvas.remove();
    defineCanvas();
  });

  const resultsTable = document.querySelector('.results');
  resultsTable.addEventListener('click', handleResultsTable);
};

const renderFooter = () => {
  const footer = document.querySelector('.footer');
  const innerElements = `
      <a class="github" href="https://github.com/Disembow"></a>
      <p>2023</p>
      <a class="rsschool" href="https://rs.school/js-stage0/"></a>
    `;

  footer.insertAdjacentHTML('afterbegin', innerElements);
};

const renderResultsPopup = (root) => {
  const popup = createTag('div', 'results__popup', root);
  popup.classList.add('results__popup_hidden');

  const overlay = createTag('div', 'overlay', root);
  // overlay.classList.add('visible');

  const innerElements = `
    <h3 class="results__title">Top results</h3>
    <table class="table">
      <thead>
        <tr>
          <th class="table__number">#</th>
          <th class="table__name">Name</th>
          <th class="table__time">Time, sec</th>
        </tr>
      </thead>
      <tbody>
        <tr class="subtable subtable__one">
          <td colspan="3">Beginner</td>
        </tr>
      </tbody>
      <tbody>
        <tr class="subtable subtable__two">
          <td colspan="3">Intermediate</td>
        </tr>
      </tbody>
      <tbody>
        <tr class="subtable subtable__three">
          <td colspan="3">Expert</td>
        </tr>
      </tbody>
    </table>
  `;

  popup.insertAdjacentHTML('afterbegin', innerElements);
};

const renderTopListItems = () => {};

const changeGameMode = () => {
  const gameMode = getGameModeFromLocalStorage();
  const gameModeElement = document.querySelector(`.${gameMode}`);
  gameModeElement.classList.add('active');

  db.gameMode = gameMode;

  return gameMode;
};

const render = (root) => {
  let gameMode = getGameModeFromLocalStorage();
  db.gameMode = gameMode;

  if (!gameMode) {
    setGameModeToLocalStorage();
    gameMode = INITIAL_GAME_MODE;
  }

  INITAL_ELEMENTS.forEach((tag) => createTag(tag, tag, root));

  renderFooter();
  renderHeader();
  renderResultsPopup(root);
  defineCanvas();
};

export { createTag, render, getGameModeFromLocalStorage, changeGameMode, renderTopListItems };
