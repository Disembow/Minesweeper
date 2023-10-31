import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
  isPopupMenuVisible: boolean;
}

const initialState: IInitialState = {
  isPopupMenuVisible: false,
};

const gameSlice = createSlice({
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
