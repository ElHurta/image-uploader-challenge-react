const express = require('express');
const response = require('./response.js'); 
const multer = require("multer");

const router = express.Router();

//Setting storage engine
const storageEngine = multer.diskStorage({
    destination: "./images",
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, `${Date.now()}--${file.originalname}`);
    },
});

const upload = multer({
    storage: storageEngine,
    limits: { fileSize: 1000000 },
});

router.post('/image-upload',upload.single() ,(req, res) => {
    response.success(req, res, 'Image uploaded successfully', 200);
});

module.exports = router;