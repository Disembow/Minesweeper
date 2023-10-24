import { db } from '../db/db.js';
import {
  handleClick,
  handleContextMenuClick,
  handleMouseDown,
  handleMouseUp,
} from '../game/handleMouseEvents.js';
import { options } from '../game/gameOptions.js';
import { BORDER_COLOR_BRIGHT, BORDER_COLOR_SHADOWED, MAIN_BG_COLOR } from '../game/variables.js';
import { loadSprites } from '../sprites/loadSprites.js';
import { drawControls } from './drawControls.js';
import { drawMinesAmount } from './drawFieldContent.js';
import { changeGameMode, createTag } from './render.js';

const defineCanvas = async () => {
  const main = document.querySelector('.main');
  const canvas = createTag('canvas', 'canvas', main);

  const preloader = document.querySelector('.preloader');
  preloader.classList.remove('preloader_done');

  const gameMode = changeGameMode();

  const { cellsW, cellsH } = options[gameMode];
  const { cellSize, borderSize, headerH, edgeH } = options.game;
  const { mines } = options[gameMode];
  const fullBorderW = borderSize + edgeH;

  canvas.width = cellsW * cellSize + borderSize + edgeH * 5 + 2;
  canvas.height = cellsH * cellSize + borderSize * 3 + headerH + edgeH * 2;

  preloader.style.width = `${canvas.width}px`;
  preloader.style.height = `${canvas.height}px`;

  const ctx = canvas.getContext('2d');

  ctx.beginPath();
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = MAIN_BG_COLOR;
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.moveTo(canvas.width, 0);
  ctx.lineTo(0, 0);
  ctx.lineTo(0, canvas.height);
  ctx.lineTo(0 + edgeH, canvas.height - edgeH);
  ctx.lineTo(0 + edgeH, 0 + edgeH);
  ctx.lineTo(canvas.width - edgeH, 0 + edgeH);
  ctx.closePath();
  ctx.fillStyle = BORDER_COLOR_BRIGHT;
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(canvas.width, 0);
  ctx.lineTo(canvas.width, canvas.height);
  ctx.lineTo(0, canvas.height);
  ctx.lineTo(edgeH, canvas.height - edgeH);
  ctx.lineTo(canvas.width - edgeH, canvas.height - edgeH);
  ctx.lineTo(canvas.width - edgeH, edgeH);
  ctx.closePath();
  ctx.fillStyle = BORDER_COLOR_SHADOWED;
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(canvas.width - borderSize, borderSize);
  ctx.lineTo(borderSize, borderSize);
  ctx.lineTo(borderSize, borderSize + headerH);
  ctx.lineTo(fullBorderW, borderSize + headerH - edgeH);
  ctx.lineTo(fullBorderW, fullBorderW);
  ctx.lineTo(canvas.width - borderSize - edgeH, fullBorderW);
  ctx.closePath();
  ctx.fillStyle = BORDER_COLOR_SHADOWED;
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(canvas.width - borderSize, borderSize);
  ctx.lineTo(canvas.width - borderSize, borderSize + headerH);
  ctx.lineTo(borderSize, borderSize + headerH);
  ctx.lineTo(fullBorderW, borderSize + headerH - edgeH);
  ctx.lineTo(canvas.width - borderSize - edgeH, borderSize + headerH - edgeH);
  ctx.lineTo(canvas.width - borderSize - edgeH, fullBorderW);
  ctx.closePath();
  ctx.fillStyle = BORDER_COLOR_BRIGHT;
  ctx.fill();

  const gameFieldY = borderSize * 2 + headerH;

  ctx.beginPath();
  ctx.moveTo(canvas.width - borderSize, gameFieldY);
  ctx.lineTo(borderSize, gameFieldY);
  ctx.lineTo(borderSize, canvas.height - borderSize);
  ctx.lineTo(fullBorderW, canvas.height - borderSize - edgeH);
  ctx.lineTo(fullBorderW, gameFieldY + edgeH);
  ctx.lineTo(canvas.width - borderSize - edgeH, gameFieldY + edgeH);
  ctx.closePath();
  ctx.fillStyle = BORDER_COLOR_SHADOWED;
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(canvas.width - borderSize, gameFieldY);
  ctx.lineTo(canvas.width - borderSize, canvas.height - borderSize);
  ctx.lineTo(borderSize, canvas.height - borderSize);
  ctx.lineTo(fullBorderW, canvas.height - borderSize - edgeH);
  ctx.lineTo(canvas.width - borderSize - edgeH, canvas.height - borderSize - edgeH);
  ctx.lineTo(canvas.width - borderSize - edgeH, gameFieldY + edgeH);
  ctx.closePath();
  ctx.fillStyle = BORDER_COLOR_BRIGHT;
  ctx.fill();

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
