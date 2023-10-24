import { db } from '../db/db.js';
import { getGameFieldCoords, getStartButtonCoords } from '../helpers/getCoords.js';
import { setUserNameToLocalStorage } from '../helpers/localStorage.js';
import { drawButton } from '../render/drawControls.js';
import { drawFieldContentOnContextMenuClick, drawMinesAmount } from '../render/drawFieldContent.js';
import { renderTopListItems } from '../render/render.js';
import {
  isVictoryGame,
  onLoseAction,
  onWinAction,
  openCellsNearEmptyCell,
  openTargetCell,
  restartGame,
  startGame,
} from './gameProcess.js';

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
          onLoseAction();
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
  const overlay = document.querySelector('.overlay');
  overlay.classList.add('visible');

  const popup = document.querySelector('.results__popup');
  popup.classList.remove('results__popup_hidden');

  renderTopListItems();
};

const handleOverlayClick = (e) => {
  e.target.classList.toggle('visible');
  const popup = document.querySelector('.results__popup');
  popup.classList.add('results__popup_hidden');
  const menu = document.querySelector('.modes__container');
  menu.classList.remove('modes__container_active');
};

const handleUsernameForm = (e) => {
  e.preventDefault();
  const username = document.forms[0].username.value;
  setUserNameToLocalStorage(username);
};

export {
  handleClick,
  handleMouseDown,
  handleMouseUp,
  handleContextMenuClick,
  handleResultsTable,
  handleOverlayClick,
  handleUsernameForm,
};
