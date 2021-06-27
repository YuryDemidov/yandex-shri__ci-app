import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import StyleContext from 'isomorphic-style-loader/StyleContext';

import { App } from './components/App/App';
import { createStore } from './store';

const insertCss = (...styles) => {
  const removeCss = styles.map((style) => style._insertCss());
  return () => removeCss.forEach((dispose) => dispose());
};

const store = createStore({
  preloadedState: window.__SERVER_STATE,
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
