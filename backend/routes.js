const express = require('express');
const response = require('./response.js'); 
const multer = require("multer");
const store = require('./dummy-db.js');
const config = require('./config.js');

const { nanoid } = require('nanoid');

const router = express.Router();

//Setting storage engine
const storageEngine = multer.diskStorage({
    destination: "./images",
    filename: (req, file, cb) => {

        const frontend_url = config.frontend.frontend_url_prod ? config.frontend.frontend_url_prod : config.frontend.frontend_url_local;

        const imgId = nanoid(10);
        
        store.upsert('imgs', {
            id: imgId,
            type: file.mimetype.split('/')[1],
            url: `${frontend_url}/images/${imgId}`,
        });

        cb(null, `${imgId}.${file.mimetype.split('/')[1]}`);
    },
});

const upload = multer({
    storage: storageEngine,
    limits: { fileSize: 1000000 },
});

router.post('/image-upload', upload.single() ,(req, res) => {
    response.success(req, res, req.file.filename.split('.')[0], 200);
});

router.get('/images/:id', (req, res) => {
    store.get('imgs', req.params.id).then(img => {
        if (!img) {
            response.error(req, res, 'Image not found', 404);
            return;
        }
        res.sendFile(`${__dirname}/images/${req.params.id}.${img.type}`);
    });
});

module.exports = router;