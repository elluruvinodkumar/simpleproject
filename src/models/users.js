const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  emailId: {
    type: String,
    lowercase: true,
    required: true,
  },
  name:{
    firstName: {
      type: String,
      default: null,
    },
    lastName: {
      type: String,
      default: null,
    },
  },
  phoneNumber: {
    required: false,
    type: String
  },
  address: {
    type: String,
    required: null
  },
  otp: {
    type: String,
    required: true
  },
  password: {
    type: String,
    default: null,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  userType: {
    type:String,
    enum: ['admin', 'seller', 'buyyer'],
  }
},
{
  timestamps: true,
}
);

module.exports = mongoose.model('user',userSchema);