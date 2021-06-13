require('dotenv').config();
const express = require('express');
const { json } = require('express');
const { PORT } = require('./config');
const { apiRouter } = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(json());

// api routes
app.use('/api', apiRouter);

app.use(errorHandler);

app.get('/', (req, res) => res.end('Hello!'));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}...`);
});
