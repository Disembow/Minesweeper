import { db } from '../db/db.ts';
import {
  handleClick,
  handleContextMenuClick,
  handleMouseDown,
  handleMouseUp,
} from '../listeners/handleMouseEvents.js';
import { options } from '../game/gameOptions.ts';
import { loadSprites } from '../sprites/loadSprites.ts';
import { drawControls } from './drawControls.js';
import { drawMinesAmount } from './drawFieldContent.js';
import { changeGameMode, createTag } from './render.js';
import { drawGameFieldBorders } from './drawGameFieldBorders.js';
import { hidePreloader, showPreloader } from './preloader.ts';

const defineCanvas = async () => {
  const main = document.querySelector('.main');
  const canvas = createTag('canvas', 'canvas', main);

  const gameMode = changeGameMode();

  const { cellsW, cellsH } = options[gameMode];
  const { cellSize, borderSize, headerH, edgeH } = options.game;
  const { mines } = options[gameMode];

  canvas.width = cellsW * cellSize + borderSize + edgeH * 5 + 2;
  canvas.height = cellsH * cellSize + borderSize * 3 + headerH + edgeH * 2;

  showPreloader(canvas);

  drawGameFieldBorders(canvas);

  const sprite = await loadSprites();

  drawControls(canvas, sprite);

  db.currentMines = mines;
  drawMinesAmount(canvas, sprite, mines);

  hidePreloader();

  canvas.onmousedown = (e) => handleMouseDown(e, canvas, sprite);
  document.onmouseup = () => handleMouseUp(canvas, sprite);

  canvas.onclick = (e) => handleClick(e, canvas, sprite);

  document.oncontextmenu = (e) => {
    if (e.target.classList.contains('canvas')) return false;
  };
  canvas.oncontextmenu = (e) => handleContextMenuClick(e, canvas, sprite);
};

export { defineCanvas };
