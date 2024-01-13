const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongodb = require('./db');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));
mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port).on('error', (err) => console.log("[ERROR]:Listening on port", err));
    console.log(`Connected to DB and listening on ${port}`);
  }
});
