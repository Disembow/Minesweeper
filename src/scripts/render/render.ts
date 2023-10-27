import { GameModes, db } from '../../app/db/db.ts';
import {
  handleOverlayClick,
  handleResultsTable,
  modesHandler,
} from '../listeners/handleMouseEvents.ts';
import { INITAL_ELEMENTS, ROOT } from '../../app/db/variables.ts';
import { createTag } from '../helpers/createTag.ts';
import {
  checkIsUserHasName,
  getGameModeFromLocalStorage,
  getGameTopResults,
  getUserNameFromLocalStorage,
  setGameModeToLocalStorage,
} from '../../helpers/gameActions/localStorage.ts';
import { onFormSubmitListener } from '../listeners/onFormSubmitListener.ts';
import { defineCanvas } from './defineCanvas.ts';
import { toggleOverlay } from '../../components/UI/Overlay/handleOverlay.ts';
import { showPopupMenu } from '../../components/GameBoard/handlers/handlePopupMenu.ts';

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
        <span class="modes__item nightmare">Nightmare</span>
        <span class="modes__item results">Results</span>
      </div>
      <div class="burger__button">
          <span></span>
          <span></span>
          <span></span>
        </div>
    </div>
  `;

  header?.insertAdjacentHTML('afterbegin', innerElements);
};

const renderFooter = () => {
  const footer = document.querySelector('.footer');
  const innerElements = `
      <a class="github" href="https://github.com/Disembow"></a>
      <p>2023</p>
      <a class="rsschool" href="https://rs.school/js-stage0/"></a>
    `;

  footer?.insertAdjacentHTML('afterbegin', innerElements);
};

const renderResultsPopup = (root: HTMLDivElement) => {
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
          <td colspan="3">${GameModes.BEGINNER}</td>
        </tr>
      </tbody>
      <tbody>
        <tr class="subtable">
          <td colspan="3">${GameModes.INTERMEDIATE}</td>
        </tr>
      </tbody>
      <tbody>
        <tr class="subtable">
          <td colspan="3">${GameModes.EXPERT}</td>
        </tr>
      </tbody>
      <tbody>
        <tr class="subtable">
          <td colspan="3">${GameModes.NIGHTMARE}</td>
        </tr>
      </tbody>
    </table>
  `;

  popup.insertAdjacentHTML('afterbegin', innerElements);

  createTag('div', 'overlay', ROOT);
};

const renderPreloader = () => {
  const main = <HTMLElement>document.querySelector('.main');
  const preloader = createTag('div', 'preloader', main);
  createTag('div', 'preloader__item', preloader);
};

const renderTopListItems = () => {
  const levelsToRemove = document.querySelectorAll('.subtable__data');
  levelsToRemove?.forEach((e) => e.remove());

  const levels = document.querySelectorAll('.subtable');
  const results = getGameTopResults();

  if (results) {
    const resultsKeys = <GameModes[]>Object.keys(results);
    levels.forEach((e, i) => {
      let rows = '';

      results[resultsKeys[i]].forEach((res, num) => {
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
  }
};

const changeGameMode = () => {
  const gameMode = getGameModeFromLocalStorage();

  if (db.gameMode && gameMode) {
    db.gameMode = gameMode;
  }

  const gameModeElement = document.querySelector(`.${gameMode}`);
  gameModeElement?.classList.add('active');

  return gameMode;
};

const addListeners = () => {
  const menuButton = <HTMLButtonElement>document.querySelector('.burger__button');
  menuButton.onclick = () => {
    showPopupMenu();
    toggleOverlay();
  };

  const overlay = <HTMLDivElement>document.querySelector('.overlay');
  overlay?.addEventListener('click', handleOverlayClick);

  const modes = <HTMLDivElement>document.querySelector('.modes__container');
  modes.addEventListener('click', modesHandler);

  const resultsTable = <HTMLDivElement>document.querySelector('.results');
  resultsTable.addEventListener('click', handleResultsTable);

  onFormSubmitListener();
};

const render = (root: HTMLDivElement) => {
  const wrapper = <HTMLDivElement>createTag('div', 'wrapper', root);

  const gameMode = getGameModeFromLocalStorage();

  if (!gameMode) {
    setGameModeToLocalStorage();
    db.gameMode = GameModes.BEGINNER;
  } else {
    db.gameMode = gameMode;
  }

  INITAL_ELEMENTS.forEach((tag) => createTag(tag, tag, wrapper));

  renderHeader();
  renderPreloader();
  renderFooter();
  renderResultsPopup(wrapper);
  defineCanvas();
  addListeners();
  checkIsUserHasName();
};

export { createTag, render, getGameModeFromLocalStorage, changeGameMode, renderTopListItems };
