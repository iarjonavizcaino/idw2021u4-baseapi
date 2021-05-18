const bodyParser = require('body-parser');
const express = require('express');

// MODELS
const country = require('./router/country.router.js')();

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ROUTERS

app.use("/v1/country", country);

module.exports = app;