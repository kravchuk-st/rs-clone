import express from 'express';
import morgan from 'morgan';
import { PORT } from './general/config.js';

const app = express();

app.use(morgan('tiny'));

app.get('/', (req, res) => {
  res.json({
    id: 1,
    name: 'Phil',
  });
});

app.use((req, res) => {
  res.status(404).send('404 NOT FOUND');
});

app.listen(PORT, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.log(`Server is listening on ${PORT}`);
  }
});
