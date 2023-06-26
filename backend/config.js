const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    api: {
        port: process.env.API_PORT || 3000
    }
}