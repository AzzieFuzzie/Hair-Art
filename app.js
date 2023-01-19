import * as dotenv from 'dotenv';

import express from 'express';
import * as prismicH from '@prismicio/helpers';
import { client } from './config/prismicConfig.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

app.use(express.static('public'));
app.set('view engine', 'pug');

app.use((req, res, next) => {
  res.locals.ctx = {
    prismicH,
  };

  next();
});

app.get('/', async (req, res) => {
  const home = await client.getFirst();
  console.log(home.data.body);
  res.render('pages/home', { home });
});

app.get('/about', (req, res) => {
  res.render('pages/about');
});

app.get('/contact', (req, res) => {
  res.render('pages/contact');
});

app.get('/treatments', (req, res) => {
  res.render('pages/treatments');
});

app.listen(port, () => {
  console.log(`Hair Art app listening at http://localhost:${port}`);
});
