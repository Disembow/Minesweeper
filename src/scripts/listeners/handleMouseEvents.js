import { db } from '../db/db.ts';
import { getGameFieldCoords, getStartButtonCoords } from '../helpers/getCoords.ts';
import { setGameModeToLocalStorage, setUserNameToLocalStorage } from '../helpers/localStorage.ts';
import { drawButton } from '../render/drawControls.ts';
import { drawFieldContentOnContextMenuClick, drawMinesAmount } from '../render/drawFieldContent.ts';
import { renderTopListItems } from '../render/render.js';
import {
  isVictoryGame,
  onLoseAction,
  onWinAction,
  openCellsNearEmptyCell,
  openTargetCell,
  restartGame,
  startGame,
} from '../game/gameProcess.js';
import { defineCanvas } from '../render/defineCanvas.js';
import { hideOverlay, showOverlay, toggleOverlay } from './handleOverlay.js';
import { hidePopupMenu, showResultsMenu } from './handlePopupMenu.js';

const handleMouseDown = (event, canvas, sprite) => {
  const coordsTerms = getStartButtonCoords(event, canvas);

  if (coordsTerms) {
    db.isMouseDown = true;
    drawButton(canvas, sprite, 'click');
  }
};

const handleMouseUp = (canvas, sprite) => {
  const isMouseDown = db.isMouseDown;

  if (isMouseDown) {
    drawButton(canvas, sprite, 'start');
  }

  db.isMouseDown = false;
};

const handleClick = (event, canvas, sprite) => {
  const { startGameTerms, cellX, cellY } = getGameFieldCoords(event, canvas);
  const restartGameTrems = getStartButtonCoords(event, canvas);

  if (startGameTerms) {
    if (!db.game) {
      startGame(canvas, sprite);
    }

    if (db.isGameRuns) {
      const targetCell = db.game[cellY][cellX];
      if (!targetCell.flag && !targetCell.isOpen) {
        openTargetCell(canvas, sprite, cellX, cellY);

        if (targetCell.isMine) {
          drawButton(canvas, sprite, 'lose');
          onLoseAction(canvas, sprite);
        }

        if (targetCell.minesAround === 0 && !targetCell.isMine) {
          openCellsNearEmptyCell(canvas, sprite, targetCell);
        }
      }
    }
  }

  if (restartGameTrems) {
    restartGame(canvas, sprite);
  }
};

const handleContextMenuClick = (event, canvas, sprite) => {
  const { startGameTerms, cellX, cellY } = getGameFieldCoords(event, canvas);

  if (startGameTerms && !db.game) {
    startGame(canvas, sprite);
  }

  drawFieldContentOnContextMenuClick(canvas, sprite, cellX, cellY);

  if (db.game[cellY][cellX].flag) {
    db.currentMines--;
  } else {
    db.currentMines++;
  }

  drawMinesAmount(canvas, sprite, db.currentMines);

  if (isVictoryGame()) {
    drawButton(canvas, sprite, 'win');
    onWinAction();
  }
};

const handleResultsTable = () => {
  showOverlay();

  const popup = document.querySelector('.results__popup');
  popup.classList.remove('results__popup_hidden');

  renderTopListItems();
};

const handleOverlayClick = () => {
  toggleOverlay();
  showResultsMenu();
  hidePopupMenu();
};

const handleUsernameForm = (e) => {
  e.preventDefault();
  const username = document.forms[0].username.value;
  setUserNameToLocalStorage(username);
};

const modesHandler = function ({ target }) {
  if (target.classList.contains('modes__item') && !target.classList.contains('results')) {
    document.querySelector('.active').classList.remove('active');

    target.classList.add('active');

    const newMode = target.textContent.toLowerCase();
    setGameModeToLocalStorage(newMode);

    const canvas = document.querySelector('.canvas');
    canvas.remove();
    defineCanvas();

    hideOverlay();
  }

  this.classList.remove('modes__container_active');
};

export {
  handleClick,
  handleMouseDown,
  handleMouseUp,
  handleContextMenuClick,
  handleResultsTable,
  handleOverlayClick,
  handleUsernameForm,
  modesHandler,
};
