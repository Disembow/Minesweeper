import { createSlice } from '@reduxjs/toolkit';

export interface IInitialState {
  isPopupMenuVisible: boolean;
}

export const initialState: IInitialState = {
  isPopupMenuVisible: false,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    togglePopupMenuVisibility: (state) => {
      state.isPopupMenuVisible = !state.isPopupMenuVisible;
    },
  },
});

export default gameSlice.reducer;
export const { togglePopupMenuVisibility } = gameSlice.actions;
