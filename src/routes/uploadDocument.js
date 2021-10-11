const express = require('express');
const router = express.Router();
const multer = require("multer");
const upload = multer();
const uploadDocumentInit = require('../controllers/document/documentInitialization');

router.post('/file-upload',upload.single("file"),uploadDocumentInit.UploadDocumentFuntion);

module.exports = router;