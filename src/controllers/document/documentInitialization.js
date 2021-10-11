const addUser = require('../user/user');
const Logger = require('../../../config/console');
const logger = new Logger().log();
const uploadDoc = require('./documentFunctionalities');

const UploadDocumentFuntion =  uploadDoc.handleFileUpload;

module.exports = {
    UploadDocumentFuntion
}