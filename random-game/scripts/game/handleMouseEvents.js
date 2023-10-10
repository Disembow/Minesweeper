import { db } from '../db/db.js';
import { getGameFieldCoords, getStartButtonCoords } from '../helpers/getCoords.js';
import { getGameTopResults, setGameTopResults } from '../helpers/localStoreage.js';
import {
  drawStartGameButton,
  drawStartGameButtonOnClick,
  drawWinStateButton,
} from '../render/drawControls.js';
import { drawFieldContentOnContextMenuClick, drawMinesAmount } from '../render/drawFieldContent.js';
import {
  isVictoryGame,
  openCellsNearEmptyCell,
  openTargetCell,
  restartGame,
  startGame,
} from './game.js';
import { options } from './options.js';

const handleMouseDown = (event, canvas, ctx, sprite) => {
  const coordsTerms = getStartButtonCoords(event, canvas);

  if (coordsTerms) {
    options.game.isMouseDown = true;
    drawStartGameButtonOnClick(canvas, ctx, sprite);
  }
};

const handleMouseUp = (event, canvas, ctx, sprite) => {
  const isMouseDown = options.game.isMouseDown;

  const coordsTerms = getStartButtonCoords(event, canvas);

  if (isMouseDown) {
    drawStartGameButton(canvas, ctx, sprite);
  }

  if (coordsTerms) {
    drawStartGameButton(canvas, ctx, sprite);
  }
};

const handleClick = (event, canvas, ctx, sprite) => {
  const { startGameTerms, cellX, cellY } = getGameFieldCoords(event, canvas);
  const restartGameTrems = getStartButtonCoords(event, canvas);

  if (restartGameTrems) {
    restartGame(canvas, ctx, sprite);
  } else if (startGameTerms) {
    if (!db.game) {
      startGame(canvas, ctx, sprite);
    }

    const targetCell = db.game[cellY][cellX];
    if (!targetCell.flag && !targetCell.isOpen) {
      openTargetCell(ctx, sprite, cellX, cellY);

      if (targetCell.minesAround === 0 && !targetCell.isMine) {
        openCellsNearEmptyCell(ctx, sprite, targetCell);
      }
    }
  }

  if (isVictoryGame()) {
    drawWinStateButton(canvas, ctx, sprite);
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

    const data = getGameTopResults();
    const gameMode = db.gameMode;

    if (!data) {
      const rawData = {
        beginner: [],
        intermediate: [],
        expert: [],
      };

      rawData[gameMode].push({
        name: 'Anonim',
        time: db.timer,
      });

      data = rawData;
    } else {
      data[gameMode].push({
        name: 'Anonim',
        time: db.timer,
      });

      data[gameMode].sort((a, b) => a.time - b.time);
    }

    setGameTopResults(data);
  }
};

export { handleClick, handleMouseDown, handleMouseUp, handleContextMenuClick };
