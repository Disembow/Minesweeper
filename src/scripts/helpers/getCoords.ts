import { options } from '../game/gameOptions.ts';

const getMouseCoords = (event: React.MouseEvent): Record<string, number> => {
  const mouseX = event.nativeEvent.offsetX;
  const mouseY = event.nativeEvent.offsetY;

  return { mouseX, mouseY };
};

const getStartButtonCoords = (event: React.MouseEvent, canvas: HTMLCanvasElement): boolean => {
  const { smileSize, borderSize, headerH } = options.game;

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

type FieldCoords = {
  fieldX: number;
  fieldY: number;
  cellX: number;
  cellY: number;
  startGameTerms: boolean;
};

const getGameFieldCoords = (event: React.MouseEvent, canvas: HTMLCanvasElement): FieldCoords => {
  const { borderSize, headerH, edgeH, cellSize } = options.game;

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
