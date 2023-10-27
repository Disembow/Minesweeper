import { configureStore } from '@reduxjs/toolkit';
import gameSlice from './slices/gameSlice';

export const store = configureStore({
  reducer: {
    game: gameSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
