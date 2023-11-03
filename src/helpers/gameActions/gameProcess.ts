import { GameModes, GameType, db } from 'app/db/db.ts';
import {
  getGameTopResults,
  getUserNameFromLocalStorage,
  setGameTopResults,
} from './localStorage.ts';
import { drawField } from 'helpers/draw/drawControls.ts';
import { drawFieldContent, drawMinesAmount, drawTimer } from 'helpers/draw/drawFieldContent.ts';
import { options } from 'app/db/gameOptions.ts';

const startGame = (canvas: HTMLCanvasElement, sprite: HTMLImageElement) => {
  if (db.gameMode) {
    const { cellsW, cellsH } = options[db.gameMode];

    initialDBFill(cellsW, cellsH);
    createInitialGameState();
    countNeighborMines();
    runTimer(canvas, sprite);

    db.isGameRuns = true;
  }
};

const restartGame = (canvas: HTMLCanvasElement, sprite: HTMLImageElement) => {
  if (db.gameMode) {
    const { mines } = options[db.gameMode];

    if (db.interval) clearInterval(db.interval);

    stopTimer(canvas, sprite);
    drawMinesAmount(canvas, sprite, mines, 'stop');
    drawField(canvas, sprite);
  }
};

const openTargetCell = (
  canvas: HTMLCanvasElement,
  sprite: HTMLImageElement,
  cellX: number,
  cellY: number,
  type = 'game',
): void => {
  drawFieldContent(canvas, sprite, cellX, cellY, type);
  if (db.openedCells) db.openedCells++;
};

const initialDBFill = (x: number, y: number): void => {
  const arr = new Array(y);

  for (let i = 0; i < y; i++) {
    arr[i] = [];
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

const createInitialGameState = (): void => {
  if (db.game && db.gameMode) {
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
  }
};

const countNeighborMinesAroundCell = (cell: GameType): void => {
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

      if (db.game && db.game[x]) {
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
  if (db.game && db.gameMode) {
    const { cellsW, cellsH } = options[db.gameMode];

    for (let i = 0; i < cellsH; i++) {
      for (let j = 0; j < cellsW; j++) {
        const cell = db.game[i][j];
        countNeighborMinesAroundCell(cell);
      }
    }
  }
};

const openCellsNearEmptyCell = (
  canvas: HTMLCanvasElement,
  sprite: HTMLImageElement,
  cell: GameType,
) => {
  const { cellX, cellY } = cell;

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;

      const x = cellY + i;
      const y = cellX + j;

      if (db.game && db.game[x]) {
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

const runTimer = (canvas: HTMLCanvasElement, sprite: HTMLImageElement) => {
  if (db.interval) {
    clearInterval(db.interval);
  }

  db.interval = setInterval(() => drawTimer(canvas, sprite, 'run'), 1000);
};

const stopTimer = (canvas: HTMLCanvasElement, sprite: HTMLImageElement) => {
  if (db.interval) {
    clearInterval(db.interval);
    drawTimer(canvas, sprite, 'stop');
  }
};

const isVictoryGame = () => {
  if (db.gameMode) {
    const { currentMines } = db;
    const { mines } = options[db.gameMode];

    if (currentMines === 0 && db.game && db.interval) {
      const map = db.game.flat().filter((e) => e.flag && e.isMine).length;

      if (map === mines) {
        clearInterval(db.interval);
        db.interval = null;
        db.isGameRuns = false;

        return true;
      }
    }

    return false;
  }
};

export type GameResultsType = {
  name: string;
  time: number;
  date: Date;
  clicks: number;
};
export type RawDataType = Record<GameModes, GameResultsType[]>;

const onWinAction = (): void => {
  let data = getGameTopResults();
  const gameMode = db.gameMode;
  const name = getUserNameFromLocalStorage();

  if (gameMode && name && db.timer) {
    const result = {
      name,
      time: db.timer,
      date: new Date(),
      clicks: db.clicks,
    };

    if (!data) {
      const rawData: RawDataType = {
        [GameModes.BEGINNER]: [],
        [GameModes.INTERMEDIATE]: [],
        [GameModes.EXPERT]: [],
        [GameModes.NIGHTMARE]: [],
      };

      rawData[gameMode].push(result);

      data = rawData;
    } else if (data) {
      data[gameMode].push(result);

      data[gameMode].sort((a, b) => a.time - b.time);
    }
  }

  setGameTopResults(data);

  db.game = null;
  db.interval = null;
  db.clicks = 0;
  db.openedCells = null;
  db.isGameRuns = true;
};

const onLoseAction = (canvas: HTMLCanvasElement, sprite: HTMLImageElement): void => {
  if (db.game && db.interval) {
    clearInterval(db.interval);
    db.interval = null;
    db.clicks = 0;
    db.isGameRuns = false;

    const mines: GameType[] = [];
    const errors: GameType[] = [];

    db.game.flat().forEach((e) => {
      if (e.isMine && !e.isOpen) {
        mines.push(e);
      } else if (!e.isMine && e.flag) {
        errors.push(e);
      }
    });

    mines.forEach((e) => openTargetCell(canvas, sprite, e.cellX, e.cellY, 'loss'));
    errors.forEach((e) => openTargetCell(canvas, sprite, e.cellX, e.cellY, 'error'));
  }
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
