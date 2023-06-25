const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');

const app = express();

app.use(bodyParser.json());

// Routes

app.listen(config.api.port, () => {
    console.log(`API listening on port ${config.api.port}`);
    }
);