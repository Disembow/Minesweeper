import { db } from '../db/db.js';
import { options } from '../game/options.js';

const { cellSize, borderSize, edgeH, headerH, scoreboardH } = options.game;

const drawFieldContent = (ctx, sprite, cellX, cellY) => {
  const target = db.game[cellY][cellX];
  const targetX = cellX * cellSize + borderSize + edgeH;
  const targetY = cellY * cellSize + borderSize * 2 + edgeH + headerH;

  const targetCoords = [targetX, targetY, cellSize, cellSize];

  target.isOpen = true;

  if (target.isMine) {
    ctx.drawImage(sprite, 102, 51, 16, 16, ...targetCoords);
  } else {
    switch (target.minesAround) {
      case 0:
        ctx.drawImage(sprite, 17, 51, 16, 16, ...targetCoords);
        break;
      case 1:
        ctx.drawImage(sprite, 0, 68, 16, 16, ...targetCoords);
        break;
      case 2:
        ctx.drawImage(sprite, 17, 68, 16, 16, ...targetCoords);
        break;
      case 3:
        ctx.drawImage(sprite, 34, 68, 16, 16, ...targetCoords);
        break;
      case 4:
        ctx.drawImage(sprite, 51, 68, 16, 16, ...targetCoords);
        break;
      case 5:
        ctx.drawImage(sprite, 68, 68, 16, 16, ...targetCoords);
        break;
      case 6:
        ctx.drawImage(sprite, 85, 68, 16, 16, ...targetCoords);
        break;
      case 7:
        ctx.drawImage(sprite, 102, 68, 16, 16, ...targetCoords);
        break;
      case 8:
        ctx.drawImage(sprite, 119, 68, 16, 16, ...targetCoords);
        break;
    }
  }
};

const drawFieldContentOnContextMenuClick = (ctx, sprite, cellX, cellY) => {
  const target = db.game[cellY][cellX];

  const targetX = cellX * cellSize + borderSize + edgeH;
  const targetY = cellY * cellSize + borderSize * 2 + edgeH + headerH;

  const targetCoords = [targetX, targetY, cellSize, cellSize];

  if (!target.isOpen) {
    if (!target.flag) {
      ctx.drawImage(sprite, 34, 51, 16, 16, ...targetCoords);
    } else {
      ctx.drawImage(sprite, 0, 51, 16, 16, ...targetCoords);
    }
  }

  target.flag = !target.flag;
};

const drawNumber = (number, canvas, ctx, sprite, column, type = 'mines') => {
  const sw = 14;
  const sh = 23.5;
  const k = sh / sw;
  const dw = 24;
  const dh = dw * k;
  const offset = 1.5;
  let x;
  let y = borderSize + headerH / 2 - scoreboardH / 2;

  if (type === 'mines') {
    x = y + (column === 1 ? 0 : column === 2 ? dw - offset - 0.5 : (dw - offset - 0.5) * 2);
  } else if (type === 'timer') {
    x =
      canvas.width -
      (borderSize + headerH / 2 - scoreboardH / 2) -
      (column === 1 ? dw : column === 2 ? (dw - offset) * 2 : (dw - offset - 0.5) * 3);
  }

  const xCoords = [126, 0, 14, 28, 42, 56, 70, 84, 98, 112];

  switch (number) {
    case 1:
      ctx.drawImage(sprite, xCoords[number], 0, sw, sh, x, y, dw, dh);
      break;
    case 2:
      ctx.drawImage(sprite, xCoords[number], 0, sw, sh, x, y, dw, dh);
      break;
    case 3:
      ctx.drawImage(sprite, xCoords[number], 0, sw, sh, x, y, dw, dh);
      break;
    case 4:
      ctx.drawImage(sprite, xCoords[number], 0, sw, sh, x, y, dw, dh);
      break;
    case 5:
      ctx.drawImage(sprite, xCoords[number], 0, sw, sh, x, y, dw, dh);
      break;
    case 6:
      ctx.drawImage(sprite, xCoords[number], 0, sw, sh, x, y, dw, dh);
      break;
    case 7:
      ctx.drawImage(sprite, xCoords[number], 0, sw, sh, x, y, dw, dh);
      break;
    case 8:
      ctx.drawImage(sprite, xCoords[number], 0, sw, sh, x, y, dw, dh);
      break;
    case 9:
      ctx.drawImage(sprite, xCoords[number], 0, sw, sh, x, y, dw, dh);
      break;
    case 0:
      ctx.drawImage(sprite, xCoords[number], 0, sw, sh, x, y, dw, dh);
      break;
  }
};

const drawMinesAmount = (canvas, ctx, sprite, mines, type = 'game') => {
  if (type === 'stop') {
    db.currentMines = options[db.gameMode].mines;
  }

  const cents = Math.floor(mines / 100);
  const tens = Math.floor((mines % 100) / 10);
  const ones = mines - cents * 100 - tens * 10;

  drawNumber(cents, canvas, ctx, sprite, 1);
  drawNumber(tens, canvas, ctx, sprite, 2);
  drawNumber(ones, canvas, ctx, sprite, 3);
};

const drawTimer = (canvas, ctx, sprite, type = 'run') => {
  if (type === 'run') {
    db.timer++;
  }

  if (type === 'stop') {
    db.timer = null;
  }

  const cents = Math.floor(db.timer / 100);
  const tens = Math.floor((db.timer % 100) / 10);
  const ones = db.timer - cents * 100 - tens * 10;

  drawNumber(cents, canvas, ctx, sprite, 3, 'timer');
  drawNumber(tens, canvas, ctx, sprite, 2, 'timer');
  drawNumber(ones, canvas, ctx, sprite, 1, 'timer');
};

export { drawFieldContent, drawFieldContentOnContextMenuClick, drawMinesAmount, drawTimer };
