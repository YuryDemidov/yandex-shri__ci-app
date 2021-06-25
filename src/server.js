import { config } from 'dotenv';
import serialize from 'serialize-javascript';
import express from 'express';
import { json } from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from './components/App';
import { PORT } from './config';
import { apiRouter } from './routes/routes';
import errorHandler from './middlewares/errorHandler';

config();

const app = express();

app.use(json());

// api routes
app.use('/api', apiRouter);

app.use(errorHandler);

const headTemplate = `
<!DOCTYPE html>
<html lang='en'>
  <head>
    <meta charset="utf-8">
    <title>Yandex SHRI CI Server</title>
    <script src="/index.js" defer></script>
`;

const tailTemplate = (innerHTml) => `
    <script>
      window.__SERVER_STATE = ${serialize({})}
    </script>
  </head>
  <body><div id='root'>${innerHTml}</div></body>
</html>
`;

app.get('/', (req, res) => {
  res.write(headTemplate);

  const reactHtml = ReactDOMServer.renderToString(<App />);

  res.write(tailTemplate(reactHtml));
  res.end();
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}...`);
});
