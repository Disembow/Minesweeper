import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import 'app/styles/style.scss';
import { App } from 'app/App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'app/providers/store/store';
import ErrorBoundary from 'app/providers/ErrorBoundary/ErrorBoundary';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
