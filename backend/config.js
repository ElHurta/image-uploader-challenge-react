const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    api: {
        port: process.env.API_PORT || 3000
    },
    frontend: {
        frontend_url_local: process.env.LOCAL_FRONTEND_URL || '',
        frontend_url_prod: process.env.PROD_FRONTEND_URL || ''
    },
}