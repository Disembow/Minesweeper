import { options } from '../game/options.js';
import { BORDER_COLOR_BRIGHT, BORDER_COLOR_SHADOWED, MAIN_BG_COLOR } from '../game/variables.js';
import { createTag } from './render.js';

const defineCanvas = (cellsW, cellsH) => {
  const main = document.querySelector('.main');
  createTag('canvas', 'canvas', main);

  const { game } = options;

  const canvas = document.querySelector('.canvas');
  canvas.width = cellsW * game.cellSize + game.borderSize;
  canvas.height = cellsH * game.cellSize + game.borderSize * 3 + game.headerH;

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
  ctx.lineTo(0 + game.edgeH, canvas.height - game.edgeH);
  ctx.lineTo(0 + game.edgeH, 0 + game.edgeH);
  ctx.lineTo(canvas.width - game.edgeH, 0 + game.edgeH);
  ctx.closePath();
  ctx.fillStyle = BORDER_COLOR_BRIGHT;
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(canvas.width, 0);
  ctx.lineTo(canvas.width, canvas.height);
  ctx.lineTo(0, canvas.height);
  ctx.lineTo(game.edgeH, canvas.height - game.edgeH);
  ctx.lineTo(canvas.width - game.edgeH, canvas.height - game.edgeH);
  ctx.lineTo(canvas.width - game.edgeH, game.edgeH);
  ctx.closePath();
  ctx.fillStyle = BORDER_COLOR_SHADOWED;
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(canvas.width - game.borderSize, game.borderSize);
  ctx.lineTo(game.borderSize, game.borderSize);
  ctx.lineTo(game.borderSize, game.borderSize + game.headerH);
  ctx.lineTo(game.borderSize + game.edgeH, game.borderSize + game.headerH - game.edgeH);
  ctx.lineTo(game.borderSize + game.edgeH, game.borderSize + game.edgeH);
  ctx.lineTo(canvas.width - game.borderSize - game.edgeH, game.borderSize + game.edgeH);
  ctx.closePath();
  ctx.fillStyle = BORDER_COLOR_SHADOWED;
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(canvas.width - game.borderSize, game.borderSize);
  ctx.lineTo(canvas.width - game.borderSize, game.borderSize + game.headerH);
  ctx.lineTo(game.borderSize, game.borderSize + game.headerH);
  ctx.lineTo(game.borderSize + game.edgeH, game.borderSize + game.headerH - game.edgeH);
  ctx.lineTo(
    canvas.width - game.borderSize - game.edgeH,
    game.borderSize + game.headerH - game.edgeH,
  );
  ctx.lineTo(canvas.width - game.borderSize - game.edgeH, game.borderSize + game.edgeH);
  ctx.closePath();
  ctx.fillStyle = BORDER_COLOR_BRIGHT;
  ctx.fill();

  const gameFieldY = game.borderSize * 2 + game.headerH;

  ctx.beginPath();
  ctx.moveTo(canvas.width - game.borderSize, gameFieldY);
  ctx.lineTo(game.borderSize, gameFieldY);
  ctx.lineTo(game.borderSize, canvas.height - game.borderSize);
  ctx.lineTo(game.borderSize + game.edgeH, canvas.height - game.borderSize - game.edgeH);
  ctx.lineTo(game.borderSize + game.edgeH, gameFieldY + game.edgeH);
  ctx.lineTo(canvas.width - game.borderSize - game.edgeH, gameFieldY + game.edgeH);
  ctx.closePath();
  ctx.fillStyle = BORDER_COLOR_SHADOWED;
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(canvas.width - game.borderSize, gameFieldY);
  ctx.lineTo(canvas.width - game.borderSize, canvas.height - game.borderSize);
  ctx.lineTo(game.borderSize, canvas.height - game.borderSize);
  ctx.lineTo(game.borderSize + game.edgeH, canvas.height - game.borderSize - game.edgeH);
  ctx.lineTo(
    canvas.width - game.borderSize - game.edgeH,
    canvas.height - game.borderSize - game.edgeH,
  );
  ctx.lineTo(canvas.width - game.borderSize - game.edgeH, gameFieldY + game.edgeH);
  ctx.closePath();
  ctx.fillStyle = BORDER_COLOR_BRIGHT;
  ctx.fill();
};

export { defineCanvas };
