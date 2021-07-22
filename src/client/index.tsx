import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import StyleContext, { InsertCSS } from 'isomorphic-style-loader/StyleContext';

import { App } from './components/App/App';
import { createStore, RootState } from './store';

declare global {
  interface Window {
    __SERVER_STATE: RootState;
  }
}

const insertCss: InsertCSS = (...styles) => {
  const removeCss = styles.map((style) => style._insertCss());
  return () => removeCss.forEach((dispose) => dispose());
};

export const store = createStore({
  preloadedState: window.__SERVER_STATE,
  queryParams: Object.fromEntries(new URLSearchParams(window.location.search).entries()),
});

ReactDOM.hydrate(
  <StyleContext.Provider value={{ insertCss }}>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StyleContext.Provider>,
  document.getElementById('root')
);
