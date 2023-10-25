type GameType = {
  isMine: boolean;
  isOpen: boolean;
  minesAround: number;
  cellX: number;
  cellY: number;
  flag: boolean;
};

interface DB {
  game: GameType[][] | null;
  gameMode: string | null;
  currentMines: number | null;
  openedCells: number | null;
  timer: number | null;
  interval: ReturnType<typeof setInterval> | null;
  isMouseDown: boolean;
  isGameRuns: boolean;
}

const db: DB = {
  game: null,
  gameMode: null,
  currentMines: null,
  openedCells: null,
  timer: null,
  interval: null,
  isMouseDown: false,
  isGameRuns: false,
};

export { db };
