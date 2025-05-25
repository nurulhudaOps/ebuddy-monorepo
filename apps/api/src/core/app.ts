import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import configs from '../configs';
import { initializeApp } from '../helpers/databases/firebase';
import routes from '../routes';

const app = express();
app.disable('x-powered-by');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Initialize Firebase
initializeApp();

// Initial route
app.use('/', routes);

// server listening
const { name, host, port } = configs.server;
app.listen(port, () => {
  console.log(`\x1b[33m[server] ${name} server listening on ${host}:${port}`);
});
