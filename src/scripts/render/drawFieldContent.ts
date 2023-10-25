import { db } from '../db/db.ts';
import { options } from '../game/gameOptions.ts';

const drawFieldContent = (
  canvas: HTMLCanvasElement,
  sprite: HTMLImageElement,
  cellX: number,
  cellY: number,
  type = 'game',
) => {
  const ctx = canvas.getContext('2d');
  const { cellSize, borderSize, edgeH, headerH } = options.game;

  if (db.game) {
    const target = db.game[cellY][cellX];
    const targetX = cellX * cellSize + borderSize + edgeH;
    const targetY = cellY * cellSize + borderSize * 2 + edgeH + headerH;
    const itemSize = 16;

    const targetCoords: [number, number, number, number, number, number] = [
      itemSize,
      itemSize,
      targetX,
      targetY,
      cellSize,
      cellSize,
    ];

    target.isOpen = true;

    if (target.isMine && type === 'game') {
      ctx?.drawImage(sprite, 102, 51, ...targetCoords);
    } else if (target.isMine && type === 'loss') {
      ctx?.drawImage(sprite, 85, 51, ...targetCoords);
    } else if (!target.isMine && type === 'error') {
      ctx?.drawImage(sprite, 119, 51, ...targetCoords);
    } else {
      switch (target.minesAround) {
        case 0:
          ctx?.drawImage(sprite, 17, 51, ...targetCoords);
          break;
        case 1:
          ctx?.drawImage(sprite, 0, 68, ...targetCoords);
          break;
        case 2:
          ctx?.drawImage(sprite, 17, 68, ...targetCoords);
          break;
        case 3:
          ctx?.drawImage(sprite, 34, 68, ...targetCoords);
          break;
        case 4:
          ctx?.drawImage(sprite, 51, 68, ...targetCoords);
          break;
        case 5:
          ctx?.drawImage(sprite, 68, 68, ...targetCoords);
          break;
        case 6:
          ctx?.drawImage(sprite, 85, 68, ...targetCoords);
          break;
        case 7:
          ctx?.drawImage(sprite, 102, 68, ...targetCoords);
          break;
        case 8:
          ctx?.drawImage(sprite, 119, 68, ...targetCoords);
          break;
      }
    }
  }
};

const drawFieldContentOnContextMenuClick = (
  canvas: HTMLCanvasElement,
  sprite: HTMLImageElement,
  cellX: number,
  cellY: number,
) => {
  const ctx = canvas.getContext('2d');
  const { cellSize, borderSize, edgeH, headerH } = options.game;

  if (db.game) {
    const target = db.game[cellY][cellX];

    const targetX = cellX * cellSize + borderSize + edgeH;
    const targetY = cellY * cellSize + borderSize * 2 + edgeH + headerH;
    const itemSize = 16;

    const targetCoords: [number, number, number, number, number, number] = [
      itemSize,
      itemSize,
      targetX,
      targetY,
      cellSize,
      cellSize,
    ];

    if (!target.isOpen) {
      if (!target.flag) {
        ctx?.drawImage(sprite, 34, 51, ...targetCoords);
      } else {
        ctx?.drawImage(sprite, 0, 51, ...targetCoords);
      }
    }

    target.flag = !target.flag;
  }
};

const drawNumber = (
  number: number,
  canvas: HTMLCanvasElement,
  sprite: HTMLImageElement,
  column: 1 | 2 | 3,
  type: 'mines' | 'timer' = 'mines',
) => {
  const ctx = canvas.getContext('2d');
  const { borderSize, headerH, scoreboardH } = options.game;

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
  } else {
    x = 0;
  }

  const xCoords = [126, 0, 14, 28, 42, 56, 70, 84, 98, 112];

  ctx?.drawImage(sprite, xCoords[number], 0, sw, sh, x, y, dw, dh);
};

const drawMinesAmount = (
  canvas: HTMLCanvasElement,
  sprite: HTMLImageElement,
  mines: number,
  type = 'game',
) => {
  if (type === 'stop' && db.gameMode) {
    db.currentMines = options[db.gameMode].mines;
  }

  const cents = Math.floor(mines / 100);
  const tens = Math.floor((mines % 100) / 10);
  const ones = mines - cents * 100 - tens * 10;

  drawNumber(cents, canvas, sprite, 1);
  drawNumber(tens, canvas, sprite, 2);
  drawNumber(ones, canvas, sprite, 3);
};

const drawTimer = (canvas: HTMLCanvasElement, sprite: HTMLImageElement, type: 'run' | 'stop') => {
  if (type === 'stop') {
    db.timer = null;
  }

  if (db.timer && type === 'run') {
    db.timer++;

    const cents = Math.floor(db.timer / 100);
    const tens = Math.floor((db.timer % 100) / 10);
    const ones = db.timer - cents * 100 - tens * 10;

    drawNumber(cents, canvas, sprite, 3, 'timer');
    drawNumber(tens, canvas, sprite, 2, 'timer');
    drawNumber(ones, canvas, sprite, 1, 'timer');
  }
};

export { drawFieldContent, drawFieldContentOnContextMenuClick, drawMinesAmount, drawTimer };
