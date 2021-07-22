import { config } from 'dotenv';
import express, { json } from 'express';
import cors from 'cors';

import { CLIENT_URL, SERVER_PORT, SERVER_URL } from './config';
import { apiRouter } from './routes';
import { analyticsController } from './controllers/analyticsController';
import { mainController } from './controllers/mainController';
import errorHandler from './middlewares/errorHandler';

config();

const app = express();

app.use(json());

const allowedOrigins = [CLIENT_URL, SERVER_URL];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};
app.use(cors(options));

app.use(express.static('dist'));

// api routes
app.use('/api', apiRouter);

app.use(errorHandler);

app.get('/', mainController);
app.get('/settings', mainController);
app.get('/build/:number', mainController);
app.get('/analytics', analyticsController);
app.get('*', (req, res) => res.send(`<h1>Page Not Found</h1><a href='/'>Back to main page</a>`));

app.listen(SERVER_PORT, () => {
  console.log(`Server started on port ${SERVER_PORT}...`);
});
