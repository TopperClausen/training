const express = require('express');
const cors = require('cors');
require('dotenv').config()

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.urlEncoded({ extended: true }));
app.use(express.json());

const router = require('./routes/router.js')

app.listen(3000);

module.exports = app
