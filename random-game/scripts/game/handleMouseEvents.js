import { db } from '../db/db.js';
import { getGameFieldCoords, getStartButtonCoords } from '../helpers/getCoords.js';
import { getGameTopResults, setGameTopResults } from '../helpers/localStoreage.js';
import {
  drawStartGameButton,
  drawStartGameButtonOnClick,
  drawWinStateButton,
} from '../render/drawControls.js';
import { drawFieldContentOnContextMenuClick, drawMinesAmount } from '../render/drawFieldContent.js';
import { renderTopListItems } from '../render/render.js';
import {
  isVictoryGame,
  onWinAction,
  openCellsNearEmptyCell,
  openTargetCell,
  restartGame,
  startGame,
} from './game.js';

const handleMouseDown = (event, canvas, ctx, sprite) => {
  const coordsTerms = getStartButtonCoords(event, canvas);

  if (coordsTerms) {
    db.isMouseDown = true;
    drawStartGameButtonOnClick(canvas, ctx, sprite);
  }
};

const handleMouseUp = (event, canvas, ctx, sprite) => {
  const isMouseDown = db.isMouseDown;

  const coordsTerms = getStartButtonCoords(event, canvas);

  if (isMouseDown) {
    drawStartGameButton(canvas, ctx, sprite);
  }

  if (coordsTerms) {
    drawStartGameButton(canvas, ctx, sprite);
  }

  db.isMouseDown = false;
};

const handleClick = (event, canvas, ctx, sprite) => {
  const { startGameTerms, cellX, cellY } = getGameFieldCoords(event, canvas);
  const restartGameTrems = getStartButtonCoords(event, canvas);

  if (isVictoryGame()) {
    drawWinStateButton(canvas, ctx, sprite);
    onWinAction();
  }

  if (startGameTerms) {
    if (!db.game) {
      startGame(canvas, ctx, sprite);
      db.isGameRuns = true;
      console.log('start');
    }

    if (db.isGameRuns) {
      const targetCell = db.game[cellY][cellX];
      if (!targetCell.flag && !targetCell.isOpen) {
        openTargetCell(ctx, sprite, cellX, cellY);

        if (targetCell.minesAround === 0 && !targetCell.isMine) {
          openCellsNearEmptyCell(ctx, sprite, targetCell);
        }
      }
    }
  }

  if (restartGameTrems) {
    restartGame(canvas, ctx, sprite);
  }
};

const handleContextMenuClick = (event, canvas, ctx, sprite) => {
  const { startGameTerms, cellX, cellY } = getGameFieldCoords(event, canvas);

  if (startGameTerms && !db.game) {
    startGame(canvas, ctx, sprite);
  }

  drawFieldContentOnContextMenuClick(ctx, sprite, cellX, cellY);

  if (db.game[cellY][cellX].flag) {
    db.currentMines--;
  } else {
    db.currentMines++;
  }

  drawMinesAmount(canvas, ctx, sprite, db.currentMines);

  if (isVictoryGame()) {
    drawWinStateButton(canvas, ctx, sprite);
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

export {
  handleClick,
  handleMouseDown,
  handleMouseUp,
  handleContextMenuClick,
  handleResultsTable,
  handleOverlayClick,
};
