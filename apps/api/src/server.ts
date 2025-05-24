import bodyParser from 'body-parser';
import cors from 'cors';
import express, { type Express } from 'express';
import morgan from 'morgan';
import { initializeApp } from './helpers/databases/firebase';

export const createServer = (): Express => {
  const app = express();
  app
    .disable('x-powered-by')
    .use(morgan('dev'))
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json())
    .use(cors())
    .get('/', (req, res) => {
      res.json({ message: 'API service already running properly' });
    });

  // Initialize Firebase
  initializeApp();

  return app;
};
