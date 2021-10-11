const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serverLogsSchema = new Schema({
    timestamp: {
    type: String
  },
  level: {
    type: String
  },
  message: {
    type: String
  },
  meta: {
    type: Object
  },
  hostname: {
    type: String
  },
},
{
  timestamps: true,
}
);

module.exports = mongoose.model('serverLogs',serverLogsSchema);