const reviewDb = require('../../models/itemReviews');

const  insertReviewDetailsTo = (params)=>{
    const addItem = new reviewDb({
        itemId:params.itemId,
        itemReview: params.itemReview,
        reviewedBy: params.reviewedBy,
        ratings: params.ratings
    });
    return addItem;
}

const  getItemReviewsData = (params) => {
    const query = { 
        $or: [{ 
            itemId: { $regex: params.itemId, $options: 'i' } 
            }] 
    }
    return reviewDb.find(query, {__v: 0}).exec()

}

module.exports = {
    insertReviewDetailsTo,
    getItemReviewsData
};

