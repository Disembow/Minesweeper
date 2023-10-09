import { db } from '../db/db.js';
import { drawFieldContent } from '../render/drawFieldContent.js';
import { options } from './options.js';

const { mines, cellsW, cellsH } = options.expert;

const startGame = () => {
  initialDBFill(cellsW, cellsH);
  createInitialGameState();
  countNeighborMines();
};

const restartGame = () => {
  db.game = null;
};

const openTargetCell = (ctx, sprite, cellX, cellY) => {
  drawFieldContent(ctx, sprite, cellX, cellY);
};

const initialDBFill = (x, y) => {
  const arr = new Array(y);

  for (let i = 0; i < y; i++) {
    arr[i] = new Array();
    for (let j = 0; j < x; j++) {
      arr[i].push({
        isMine: false,
        isOpen: false,
        minesAround: 0,
        cellX: j,
        cellY: i,
        flag: false,
      });
    }
  }

  db.game = arr;
};

const createInitialGameState = () => {
  const cache = [];

  for (let m = 0; m < mines; m++) {
    const i = Math.floor(Math.random() * cellsW);
    const j = Math.floor(Math.random() * cellsH);
    const coords = `${i}-${j}`;

    const isMineAlreadyExists = cache.indexOf(coords);

    if (isMineAlreadyExists === -1) {
      db.game[j][i].isMine = true;
      cache.push(coords);
    } else {
      m--;
    }
  }

  cache.splice(0, cache.length);
};

const countNeighborMinesAroundCell = (cell) => {
  let mines = 0;
  const { isMine, cellX, cellY } = cell;

  if (isMine) {
    return;
  }

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;

      const x = cellY + i;
      const y = cellX + j;

      if (db.game[x]) {
        if (db.game[x][y]) {
          const checkTarget = db.game[x][y];

          if (checkTarget.isMine) {
            mines++;
          }
        }
      }
    }
  }

  cell.minesAround = mines;
};

const countNeighborMines = () => {
  for (let i = 0; i < cellsH; i++) {
    for (let j = 0; j < cellsW; j++) {
      const cell = db.game[i][j];
      countNeighborMinesAroundCell(cell);
    }
  }
};

export { restartGame, startGame, openTargetCell };
