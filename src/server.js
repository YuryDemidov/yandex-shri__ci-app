const express = require('express');
const { apiRouter, dbRouter } = require('./routes');

const app = express();

// api routes
app.use('/api', apiRouter);

// main routes
app.use('/', dbRouter);

app.get('/', (req, res) => res.end(`<a href='/conf'>hello</a>`));

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}...`);
});
