import { db } from '../db/db.js';
import { drawField } from '../render/drawControls.js';
import { drawFieldContent, drawMinesAmount, drawTimer } from '../render/drawFieldContent.js';
import { options } from './options.js';

const { mines, cellsW, cellsH } = options.expert;

const startGame = (canvas, ctx, sprite) => {
  initialDBFill(cellsW, cellsH);
  createInitialGameState();
  countNeighborMines();
  runTimer(canvas, ctx, sprite);
};

const restartGame = (canvas, ctx, sprite) => {
  db.game = null;
  clearInterval(db.interval);
  stopTimer(canvas, ctx, sprite);
  drawMinesAmount(canvas, ctx, sprite, options.expert.mines, 'stop');
  drawField(ctx, sprite);

  db.interval = null;
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

const openCellsNearEmptyCell = (ctx, sprite, cell) => {
  const { cellX, cellY } = cell;

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;

      const x = cellY + i;
      const y = cellX + j;

      if (db.game[x]) {
        if (db.game[x][y] && !db.game[x][y].isOpen) {
          const cellToCheck = db.game[x][y];

          openTargetCell(ctx, sprite, y, x);

          if (cellToCheck.minesAround === 0 && !cellToCheck.isMine && cellToCheck.isOpen) {
            openCellsNearEmptyCell(ctx, sprite, cellToCheck);
          }
        }
      }
    }
  }
};

const runTimer = (canvas, ctx, sprite) => {
  clearInterval(db.interval);
  db.interval = setInterval(() => drawTimer(canvas, ctx, sprite), 1000);
};

const stopTimer = (canvas, ctx, sprite) => {
  clearInterval(db.interval);
  drawTimer(canvas, ctx, sprite, 'stop');
};

export { restartGame, startGame, openTargetCell, openCellsNearEmptyCell };
