const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/verifyToken');
const reviewInit = require('../controllers/reviews/reviewsInitialization');
const fetchItemReviews = require('../controllers/reviews/reviews');

router.post('/add-review',verifyToken,reviewInit.addReview);

router.post('/fetch-item-reviews',verifyToken,reviewInit.fetchItemReviewData);
 
module.exports = router;