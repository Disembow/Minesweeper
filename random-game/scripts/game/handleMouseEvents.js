import { drawStartGameButton, drawStartGameButtonOnClick } from '../render/drawControls.js';
import { options } from './options.js';

const { scoreboardH, smileSize, borderSize, headerH, cellSize, edgeH } = options.game;

const handleMouseDown = (event, canvas, ctx, sprite) => {
  const mouseX = event.offsetX;
  const mouseY = event.offsetY;

  const smileX = canvas.width / 2 - smileSize / 2;
  const smileY = borderSize + headerH / 2 - smileSize / 2;

  if (
    mouseX > smileX &&
    mouseX < smileX + smileSize &&
    mouseY > smileY &&
    mouseY < smileY + smileSize
  ) {
    options.game.isMouseDown = true;
    drawStartGameButtonOnClick(canvas, ctx, sprite);
  }
};

const handleMouseUp = (canvas, ctx, sprite) => {
  const isMouseDown = options.game.isMouseDown;

  if (isMouseDown) {
    drawStartGameButton(canvas, ctx, sprite);
  }
};

const handleClick = (event, canvas, ctx, sprite) => {};

export { handleClick, handleMouseDown, handleMouseUp };
