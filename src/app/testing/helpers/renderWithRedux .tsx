import { PropsWithChildren } from 'react';
import { PreloadedState, configureStore } from '@reduxjs/toolkit';
import { gameSlice } from 'app/providers/store/slices/gameSlice';
import { RenderOptions, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { AppStore, RootState } from 'app/providers/store/store';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export const renderWithRedux = (
  component: React.ReactElement,
  {
    preloadedState = {},
    store = configureStore({
      reducer: { game: gameSlice.reducer },
      preloadedState,
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) => {
  function Wrapper({ children }: PropsWithChildren): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(component, { wrapper: Wrapper, ...renderOptions }) };
};
