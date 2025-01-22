import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import logger from 'morgan';

//routes
import { startRouter } from './routes/start';
import { NotFoundError } from './handlers/errors/not-found-error';
import { errorHandler } from './middlewares/error-handler';
//middlewares

const app = express();

app.set('trust proxy', true); //trust HTTPS connection
app.use(json());
app.use(logger('dev', {}));
//api
app.use(startRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

//middleware Usage
app.use(errorHandler);

export { app };
