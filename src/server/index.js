import { config } from 'dotenv';
import express, { json } from 'express';
import cors from 'cors';

import { PORT } from './config';
import { apiRouter } from './routes';
import { mainController } from './controllers/mainController';
import errorHandler from './middlewares/errorHandler';

config();

const app = express();

app.use(json());
app.use(cors());
app.options('*', cors());

// api routes
app.use('/api', apiRouter);

app.use(errorHandler);

app.get('/', mainController);
app.get('/settings', mainController);
app.get('/build/:number', mainController);
app.get('*', (req, res) => res.send(`<h1>Page Not Found</h1><a href='/'>Back to main page</a>`));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}...`);
});
