import { db } from '../db/db.js';
import {
  handleOverlayClick,
  handleResultsTable,
  modesHandler,
} from '../listeners/handleMouseEvents.js';
import { INITAL_ELEMENTS, INITIAL_GAME_MODE, ROOT } from '../game/variables.js';
import { createTag } from '../helpers/createTag.js';
import {
  getGameModeFromLocalStorage,
  getGameTopResults,
  getUserNameFromLocalStorage,
  setGameModeToLocalStorage,
} from '../helpers/localStorage.js';
import { onFormSubmitListener } from '../listeners/onFormSubmitListener.js';
import { defineCanvas } from './defineCanvas.js';
import { toggleOverlay } from '../listeners/handleOverlay.js';
import { showPopupMenu } from '../listeners/handlePopupMenu.js';

const renderHeader = () => {
  const header = document.querySelector('.header');
  const username = getUserNameFromLocalStorage();

  const innerElements = `
    <div class="header__container">
      <form class="form" name="username">
        <input autocomplete="off" name="username" class="username__input" placeholder="Your name..." value="${
          username || ''
        }" ${username === '' && 'autofocus'} />
        <button class="button__submit" type="submit"></button>
      </form>
      <div class="modes__container">
        <span class="modes__item beginner">Beginner</span>
        <span class="modes__item intermediate">Intermediate</span>
        <span class="modes__item expert">Expert</span>
        <span class="modes__item custom">Custom</span>
        <span class="modes__item results">Results</span>
      </div>
      <div class="burger__button">
          <span></span>
          <span></span>
          <span></span>
        </div>
    </div>
  `;

  header.insertAdjacentHTML('afterbegin', innerElements);
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
        <tr class="subtable">
          <td colspan="3">Beginner</td>
        </tr>
      </tbody>
      <tbody>
        <tr class="subtable">
          <td colspan="3">Intermediate</td>
        </tr>
      </tbody>
      <tbody>
        <tr class="subtable">
          <td colspan="3">Expert</td>
        </tr>
      </tbody>
    </table>
  `;

  popup.insertAdjacentHTML('afterbegin', innerElements);

  createTag('div', 'overlay', ROOT);
};

const renderPreloader = () => {
  const preloader = createTag('div', 'preloader', document.querySelector('.main'));
  createTag('div', 'preloader__item', preloader);
};

const renderTopListItems = () => {
  const levelsToRemove = document.querySelectorAll('.subtable__data');
  levelsToRemove?.forEach((e) => e.remove());

  const levels = document.querySelectorAll('.subtable');
  const results = getGameTopResults();
  const resultsKeys = Object.keys(results);

  levels.forEach((e, i) => {
    let rows = '';
    const key = resultsKeys[i];

    results[key].forEach((res, num) => {
      if (num < 10) {
        rows += `
          <tr class="subtable subtable__data">
            <th class="table__number">${num + 1}</th>
            <th class="table__name">${res.name}</th>
            <th class="table__time">${res.time}</th>
          </tr>
        `;
      } else {
        return;
      }
    });

    e.insertAdjacentHTML('afterend', rows);
  });
};

const changeGameMode = () => {
  const gameMode = getGameModeFromLocalStorage();
  const gameModeElement = document.querySelector(`.${gameMode}`);
  gameModeElement.classList.add('active');

  db.gameMode = gameMode;

  return gameMode;
};

const addListeners = () => {
  const menuButton = document.querySelector('.burger__button');
  menuButton.onclick = () => {
    showPopupMenu();
    toggleOverlay();
  };

  const overlay = document.querySelector('.overlay');
  overlay.addEventListener('click', handleOverlayClick);

  const modes = document.querySelector('.modes__container');
  modes.addEventListener('click', modesHandler);

  const resultsTable = document.querySelector('.results');
  resultsTable.addEventListener('click', handleResultsTable);

  onFormSubmitListener();
};

const render = (root) => {
  const wrapper = createTag('div', 'wrapper', root);

  let gameMode = getGameModeFromLocalStorage();
  db.gameMode = gameMode;

  if (!gameMode) {
    setGameModeToLocalStorage();
    gameMode = INITIAL_GAME_MODE;
  }

  INITAL_ELEMENTS.forEach((tag) => createTag(tag, tag, wrapper));

  renderHeader();
  renderPreloader();
  renderFooter();
  renderResultsPopup(wrapper);
  defineCanvas();
  addListeners();
};

export { createTag, render, getGameModeFromLocalStorage, changeGameMode, renderTopListItems };
