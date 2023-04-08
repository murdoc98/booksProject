import express, { Application } from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

import swaggerSetup from './docs/swaggerSetup.doc';
import morganMiddleware from './middlewares/morgan.middleware';
import routes from './routes';

export default function createServer(): express.Application {
  dotenv.config();
  const app: Application = express();
  app.set('PORT', parseInt(<string>process.env.SERVER_PORT, 10) || 4000);
  if (process.env.NODE_ENV === 'prod') app.use(morganMiddleware);
  if (process.env.NODE_ENV === 'dev') {
    app.use(morgan('dev'));
    app.use(swaggerSetup);
  }
  app.use(express.static('public'));
  app.use(helmet());
  app.use(express.json());
  app.use(
    cors({
      methods: ['GET', 'PUT', 'POST', 'DELETE'],
      origin: '*',
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );
  app.use('/api', routes);
  return app;
}