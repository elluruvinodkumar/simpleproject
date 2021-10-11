const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/verifyToken');
const itemsInit = require('../controllers/orders/ordersInitialization');

router.post('/add-order-details',verifyToken,itemsInit.addItem);
 
module.exports = router;