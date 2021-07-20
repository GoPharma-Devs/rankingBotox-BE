const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();

const uploadCtrl = require('../controllers/upload.controller');

router.post('/players/:id', upload.single('thumbnail'), uploadCtrl.uploadThumbnail);

module.exports = router;
