import { db } from '../db/db.js';
import {
  handleOverlayClick,
  handleResultsTable,
  handleUsernameForm,
} from '../game/handleMouseEvents.js';
import { INITAL_ELEMENTS, INITIAL_GAME_MODE, ROOT } from '../game/variables.js';
import { createTag } from '../helpers/createTag.js';
import {
  getGameModeFromLocalStorage,
  getGameTopResults,
  getUserNameFromLocalStorage,
  setGameModeToLocalStorage,
  setUserNameToLocalStorage,
} from '../helpers/localStoreage.js';
import { defineCanvas } from './defineCanvas.js';

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

    results[key].forEach((r, n) => {
      if (n < 10) {
        rows += `
          <tr class="subtable subtable__data">
            <th class="table__number">${n + 1}</th>
            <th class="table__name">${r.name}</th>
            <th class="table__time">${r.time}</th>
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
    document.querySelector('.modes__container').classList.add('modes__container_active');

    document.querySelector('.overlay').classList.toggle('visible');
  };

  document.querySelector('.overlay').addEventListener('click', handleOverlayClick);

  const modes = document.querySelector('.modes__container');
  modes.addEventListener('click', ({ target }) => {
    if (target.classList.contains('modes__item') && !target.classList.contains('results')) {
      document.querySelector('.active').classList.remove('active');

      target.classList.add('active');

      const newMode = target.textContent.toLowerCase();
      setGameModeToLocalStorage(newMode);

      const canvas = document.querySelector('.canvas');
      canvas.remove();
      defineCanvas();

      document.querySelector('.overlay').classList.remove('visible');
    }

    modes.classList.remove('modes__container_active');
  });

  const resultsTable = document.querySelector('.results');
  resultsTable.addEventListener('click', handleResultsTable);

  const form = document.forms[0];
  form.onsubmit = handleUsernameForm;

  const submitButton = document.querySelector('.button__submit');
  submitButton.onclick = handleUsernameForm;
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
