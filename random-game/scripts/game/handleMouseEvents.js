import { db } from '../db/db.js';
import { getGameFieldCoords, getMouseCoords, getStartButtonCoords } from '../helpers/getCoords.js';
import { drawStartGameButton, drawStartGameButtonOnClick } from '../render/drawControls.js';
import { drawFieldContentOnContextMenuClick } from '../render/drawFieldContent.js';
import { openTargetCell, restartGame, startGame } from './game.js';
import { options } from './options.js';

const { smileSize, borderSize, headerH } = options.game;

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

// const handleMouseEnter = (event, canvas, ctx, sprite) => {
//   const coordsTrems = getStartButtonCoords(event, canvas);

//   if (coordsTrems) {
//     options.game.isMouseDown = true;
//     drawStartGameButtonOnHover(canvas, ctx, sprite);
//   } else if (options.game.isMouseDown === true) {
//     options.game.isMouseDown = false;
//     drawStartGameButton(canvas, ctx, sprite);
//   }
// };

const handleClick = (event, canvas, ctx, sprite) => {
  const { startGameTerms, cellX, cellY } = getGameFieldCoords(event, canvas);
  const restartGameTrems = getStartButtonCoords(event, canvas);

  if (restartGameTrems) {
    restartGame();
  } else if (startGameTerms) {
    if (!db.game) {
      startGame(ctx, sprite, cellX, cellY);
    } else {
      openTargetCell(ctx, sprite, cellX, cellY);
    }
  }
};

const handleContextMenuClick = (event, canvas, ctx, sprite) => {
  const { startGameTerms, cellX, cellY } = getGameFieldCoords(event, canvas);

  if (startGameTerms && !db.game) {
    startGame(ctx, sprite, cellX, cellY);
  }
  drawFieldContentOnContextMenuClick(ctx, sprite, cellX, cellY);
};

export { handleClick, handleMouseDown, handleMouseUp, handleContextMenuClick };
