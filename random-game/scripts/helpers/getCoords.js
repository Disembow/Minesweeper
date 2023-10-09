import { options } from '../game/options.js';

const { smileSize, borderSize, headerH, edgeH, cellSize } = options.game;

const getMouseCoords = (event) => {
  const mouseX = event.offsetX;
  const mouseY = event.offsetY;

  return { mouseX, mouseY };
};

const getStartButtonCoords = (event, canvas) => {
  const { mouseX, mouseY } = getMouseCoords(event);

  const smileX = canvas.width / 2 - smileSize / 2;
  const smileY = borderSize + headerH / 2 - smileSize / 2;

  const restartGameCoordsTrems =
    mouseX > smileX &&
    mouseX < smileX + smileSize &&
    mouseY > smileY &&
    mouseY < smileY + smileSize;

  return restartGameCoordsTrems;
};

const getGameFieldCoords = (event, canvas) => {
  const { mouseX, mouseY } = getMouseCoords(event);

  const fieldX = borderSize + edgeH;
  const fieldY = borderSize * 2 + headerH + edgeH;
  const fieldEndX = canvas.width - borderSize - edgeH;
  const fieldEndY = canvas.height - borderSize - edgeH;

  const startGameTerms =
    mouseX > fieldX && mouseX < fieldEndX && mouseY > fieldY && mouseY < fieldEndY;

  const cellX = Math.floor((mouseX - fieldX) / cellSize);
  const cellY = Math.floor((mouseY - fieldY) / cellSize);

  return { fieldX, fieldY, cellX, cellY, startGameTerms };
};

export { getStartButtonCoords, getGameFieldCoords };
