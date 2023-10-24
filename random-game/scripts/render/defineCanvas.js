import { db } from '../db/db.js';
import {
  handleClick,
  handleContextMenuClick,
  handleMouseDown,
  handleMouseUp,
} from '../game/handleMouseEvents.js';
import { options } from '../game/gameOptions.js';
import { loadSprites } from '../sprites/loadSprites.js';
import { drawControls } from './drawControls.js';
import { drawMinesAmount } from './drawFieldContent.js';
import { changeGameMode, createTag } from './render.js';
import { drawGameFieldBorders } from './drawGameFieldBorders.js';

const defineCanvas = async () => {
  const main = document.querySelector('.main');
  const canvas = createTag('canvas', 'canvas', main);

  const preloader = document.querySelector('.preloader');
  preloader.classList.remove('preloader_done');

  const gameMode = changeGameMode();

  const { cellsW, cellsH } = options[gameMode];
  const { cellSize, borderSize, headerH, edgeH } = options.game;
  const { mines } = options[gameMode];

  canvas.width = cellsW * cellSize + borderSize + edgeH * 5 + 2;
  canvas.height = cellsH * cellSize + borderSize * 3 + headerH + edgeH * 2;

  preloader.style.width = `${canvas.width}px`;
  preloader.style.height = `${canvas.height}px`;

  const ctx = canvas.getContext('2d');
  drawGameFieldBorders(canvas);

  const sprite = await loadSprites();

  drawControls(canvas, ctx, sprite);

  db.currentMines = mines;
  drawMinesAmount(canvas, ctx, sprite, mines);

  preloader.classList.add('preloader_done');

  canvas.onmousedown = (e) => handleMouseDown(e, canvas, ctx, sprite);
  document.onmouseup = () => handleMouseUp(canvas, ctx, sprite);

  canvas.onclick = (e) => handleClick(e, canvas, ctx, sprite);

  document.oncontextmenu = (e) => {
    if (e.target.classList.contains('canvas')) return false;
  };
  canvas.oncontextmenu = (e) => handleContextMenuClick(e, canvas, ctx, sprite);
};

export { defineCanvas };
