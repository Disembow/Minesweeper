import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { GameModes } from '../../db/db';

type GameType = {
  isMine: boolean;
  isOpen: boolean;
  minesAround: number;
  cellX: number;
  cellY: number;
  flag: boolean;
};

interface IInitialState {
  gameMode: GameModes;
  game: GameType[][] | null;
  currentMines: number | null;
  openedCells: number | null;
  timer: number;
  interval: ReturnType<typeof setInterval> | null;
  isMouseDown: boolean;
  isGameRuns: boolean;
}

const initialState: IInitialState = {
  gameMode: GameModes.BEGINNER,
  game: null,
  currentMines: null,
  openedCells: null,
  timer: 0,
  interval: null,
  isMouseDown: false,
  isGameRuns: false,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    changeGameMode: (state, { payload }: PayloadAction<{ gameMode: GameModes; mines: number }>) => {
      state.gameMode = payload.gameMode;
      state.currentMines = payload.mines;
    },
    setCurrentGame: (state, { payload }: PayloadAction<GameType[][]>) => {
      state.game = payload;
    },
    removeCurrentGame: (state) => {
      state.game = null;
      state.interval = null;
      state.openedCells = null;
      state.isGameRuns = true;
    },
  },
});

export default gameSlice.reducer;
export const { changeGameMode } = gameSlice.actions;
