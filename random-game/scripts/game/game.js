import { db } from '../db/db.js';
import { options } from './options.js';

const { mines, cellsW, cellsH } = options.expert;

const startGame = (cellX, cellY) => {
  initialDBFill(cellsW, cellsH);
  createInitialGameState();
};

const restartGame = () => {
  db.game = null;
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

export { restartGame, startGame };
