const db = require('./db');
const dotenv = require('dotenv');
const express = require('express');

dotenv.config();

const app = express();

const port = process.env.PORT || 3000

app.use('/', require('./routes/'));
app.listen(port, () => {console.log("Running on port " + port)});

db.connect().catch(console.error);

