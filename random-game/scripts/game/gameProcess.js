import { db } from '../db/db.js';
import {
  getGameTopResults,
  getUserNameFromLocalStorage,
  setGameTopResults,
} from '../helpers/localStorage.js';
import { drawField } from '../render/drawControls.js';
import { drawFieldContent, drawMinesAmount, drawTimer } from '../render/drawFieldContent.js';
import { options } from './gameOptions.js';

const startGame = (canvas, sprite) => {
  const { cellsW, cellsH } = options[db.gameMode];

  initialDBFill(cellsW, cellsH);
  createInitialGameState();
  countNeighborMines();
  runTimer(canvas, sprite);

  db.isGameRuns = true;
};

const restartGame = (canvas, sprite) => {
  const { mines } = options[db.gameMode];

  clearInterval(db.interval);
  stopTimer(canvas, sprite);
  drawMinesAmount(canvas, sprite, mines, 'stop');
  drawField(canvas, sprite);

  db.game = null;
  db.interval = null;
  db.openedCells = null;
  db.isGameRuns = true;
};

const openTargetCell = (canvas, sprite, cellX, cellY) => {
  drawFieldContent(canvas, sprite, cellX, cellY);
  db.openedCells++;
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
  const { mines, cellsW, cellsH } = options[db.gameMode];

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
  const { cellsW, cellsH } = options[db.gameMode];

  for (let i = 0; i < cellsH; i++) {
    for (let j = 0; j < cellsW; j++) {
      const cell = db.game[i][j];
      countNeighborMinesAroundCell(cell);
    }
  }
};

const openCellsNearEmptyCell = (canvas, sprite, cell) => {
  const { cellX, cellY } = cell;

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;

      const x = cellY + i;
      const y = cellX + j;

      if (db.game[x]) {
        if (db.game[x][y] && !db.game[x][y].isOpen) {
          const cellToCheck = db.game[x][y];

          if (!cellToCheck.flag) {
            openTargetCell(canvas, sprite, y, x);
          }

          if (
            cellToCheck.minesAround === 0 &&
            !cellToCheck.isMine &&
            cellToCheck.isOpen &&
            !cellToCheck.flag
          ) {
            openCellsNearEmptyCell(canvas, sprite, cellToCheck);
          }
        }
      }
    }
  }
};

const runTimer = (canvas, sprite) => {
  clearInterval(db.interval);
  db.interval = setInterval(() => drawTimer(canvas, sprite, 'run'), 1000);
};

const stopTimer = (canvas, sprite) => {
  clearInterval(db.interval);
  drawTimer(canvas, sprite, 'stop');
};

const isVictoryGame = () => {
  const { currentMines } = db;
  const { mines } = options[db.gameMode];

  if (currentMines === 0 && db.game) {
    const map = db.game.flat().filter((e) => e.flag && e.isMine).length;

    if (map === mines) {
      clearInterval(db.interval);
      db.interval = null;
      db.isGameRuns = false;

      return true;
    }
  }

  return false;
};

const onWinAction = () => {
  let data = getGameTopResults();
  const gameMode = db.gameMode;
  const name = getUserNameFromLocalStorage();

  if (!data) {
    const rawData = {
      beginner: [],
      intermediate: [],
      expert: [],
    };

    rawData[gameMode].push({
      name,
      time: db.timer,
    });

    data = rawData;
  } else {
    data[gameMode].push({
      name,
      time: db.timer,
    });

    data[gameMode].sort((a, b) => a.time - b.time);
  }

  setGameTopResults(data);
};

const onLoseAction = () => {
  clearInterval(db.interval);
  db.interval = null;
  db.isGameRuns = false;
};

export {
  restartGame,
  startGame,
  openTargetCell,
  openCellsNearEmptyCell,
  isVictoryGame,
  onWinAction,
  onLoseAction,
};
