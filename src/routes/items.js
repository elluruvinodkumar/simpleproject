const express = require('express');
const router = express.Router();
const multer = require("multer");
const upload = multer();
const itemsInit = require('../controllers/items/itemInitialization');
const { verifyToken } = require('../middlewares/verifyToken');

router.post('/add-item-details',verifyToken,upload.single("file"),itemsInit.UploadDocumentFuntion);
 
router.post('/add-itemdetails',itemsInit.addItem);    

router.post('/fetch-item',itemsInit.fetchItem);

router.post('/fetch-all-items',verifyToken,itemsInit.fetchAllItem); 

router.get('/stats',verifyToken, itemsInit.getStatistics);

module.exports = router;