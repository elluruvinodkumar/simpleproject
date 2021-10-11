const express = require('express');
const router = express.Router();
const User = require('./user');
const UploadSellerDocument = require('./uploadDocument');
const Items = require('./items');
const Orders = require('./orders');
const Payment = require('./stripe');
const Reviews = require('./reviews');

router.use('/', User);
router.use('/', UploadSellerDocument);
router.use('/', Items);
router.use('/', Orders);
router.use('/', Payment);
router.use('/', Reviews);


module.exports = router;
