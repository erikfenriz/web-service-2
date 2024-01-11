const db = require('./db');
const dotenv = require('dotenv');
const express = require('express');

dotenv.config();

const app = express();

app.use('/', require('./routes/'));

app.listen(process.env.PORT || 3000);
console.log()

db.connect().catch(console.error);

