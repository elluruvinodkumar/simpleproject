const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const documentVerifySchema = new Schema({
  sellerId: {
    type: String,
    lowercase: true,
    required: true,
  },
  sellerCompanyDetails:{
    type:String,
    required:true,
    default:null
  },
  sellerPersonalDetails:{
    type:String,
    required:true,
    default:null
  },
  documentVerification: {
    type: Boolean,
    default: false,
  },
  documentUrl:{
    type:String,
    required:true,
    default:null
  }
});

module.exports = mongoose.model('documentverification',documentVerifySchema);