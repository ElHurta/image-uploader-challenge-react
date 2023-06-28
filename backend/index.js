const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const router = require('./routes.js');

const app = express();

const whitelist = [config.frontend.frontend_url_local, config.frontend.frontend_url_prod];

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin) {
            callback(null, true);
            return;
        }
        const exists = whitelist.some(domain => domain === origin);
        if (exists) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Routes
app.use('/', router);

app.listen(config.api.port, () => {
    console.log(`API listening on port ${config.api.port}`);
    }
);