const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemReviewSchema = new Schema({
    itemId:{
        type:String,
        required:true
    },
    itemReview:{
        type:String,
        required:true
    },
    reviewedBy:{
        type:String,
        required:true
    },
    ratings:{
        type:String,
        required:true
    }  
},
{
  timestamps: true,
}
);

module.exports = mongoose.model('itemrevirew',itemReviewSchema);