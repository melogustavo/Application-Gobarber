import 'reflect-metadata';

import express from 'express';
import routes from './routes/index';
import uploadConfig from './config/upload';

import './database';

const app = express();

app.use(express.json());

// Esse files eh pra vc conseguir visualizar os avatares
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333');
});
