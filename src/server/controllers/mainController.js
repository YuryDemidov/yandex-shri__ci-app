import React from 'react';
import { Provider } from 'react-redux';
import { matchPath, StaticRouter } from 'react-router-dom';
import ReactDOMServer from 'react-dom/server';
import StyleContext from 'isomorphic-style-loader/StyleContext';
import serialize from 'serialize-javascript';

import { createStore } from '../../client/store';
import { clientRoutesConfig } from '../../client/routes';
import { App } from '../../client/components/App/App';

import svgFavicon from '../../client/assets/img/favicon.svg';
import pngFavicon from '../../client/assets/img/favicon.png';

const headTemplate = `
<!DOCTYPE html>
<html lang='en'>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Yandex SHRI CI Server</title>
    <link rel="icon" type="image/svg+xml" href=${svgFavicon}>
    <link rel="icon" type="image/png" href=${pngFavicon}>
    <script src="/index.js" defer></script>
`;

const tailTemplate = (innerHTml, state) => `
    <script>
      window.__SERVER_STATE = ${serialize(state)}
    </script>
  </head>
  <body><div id='root'>${innerHTml}</div></body>
</html>
`;

export const mainController = async (req, res) => {
  res.write(headTemplate);

  const store = createStore({
    queryParams: req.query,
  });

  const matchedRoute = clientRoutesConfig.find((route) => matchPath(req.path, route));
  const { params } = matchPath(req.path, matchedRoute);
  if (matchedRoute && matchedRoute.loadData) {
    await store.dispatch(matchedRoute.loadData(params));
  }

  const routerContext = {};
  const reactHtml = ReactDOMServer.renderToString(
    <StyleContext.Provider value={{ insertCss: () => {} }}>
      <StaticRouter location={req.url} context={routerContext}>
        <Provider store={store}>
          <App />
        </Provider>
      </StaticRouter>
    </StyleContext.Provider>
  );

  res.write(tailTemplate(reactHtml, store.getState()));
  res.end();
};
