const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({

  emailId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true
  },
  description: {
      type: String,
      required: true
  },
  // category:[{
  //   subCategory: {
  //       type: String,
  //       required: true
  //   },
  //   item: {
  //     type: String,
  //     required: true
  //   }
  // }],
  category:{
      type: Array,
      required: true
  },
  // category:{
  //   type: String,
  //   required: true
  // },
  price: {
      type: String,
      required: true
  },
  pics:[{
    url: {
        type: String,
        required: true
    }
  }],

},
{
  timestamps: true,
}

);

module.exports = mongoose.model('items', itemSchema);

