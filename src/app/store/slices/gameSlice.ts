import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {}

const initialState: IInitialState = {};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {},
});

export default gameSlice.reducer;
