import { db } from '../db/db.js';
import { getGameFieldCoords, getStartButtonCoords } from '../helpers/getCoords.js';
import { drawStartGameButton, drawStartGameButtonOnClick } from '../render/drawControls.js';
import { drawFieldContentOnContextMenuClick, drawMinesAmount } from '../render/drawFieldContent.js';
import { openTargetCell, restartGame, runTimer, startGame } from './game.js';
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
    restartGame();
  } else if (startGameTerms) {
    if (!db.game) {
      startGame(canvas, ctx, sprite);
    }

    openTargetCell(ctx, sprite, cellX, cellY);
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
};

export { handleClick, handleMouseDown, handleMouseUp, handleContextMenuClick };
