const addReview = require('./insertReviews');
const fetchReviews = require('./fetchItemReviews');

const insertReviewData = (params,callback) => {
    return addReview.insertReviewDetails(params,callback);
}

const  fetchItemReviewData = (params, callback) => {
    return fetchReviews.fetchItemReviewsFun(params,callback);
}

module.exports = {
    insertReviewData,
    fetchItemReviewData
};