const items = require('./items');
const Logger = require('../../../config/console');
const logger = new Logger().log();

const uploadDoc = require('./ItemFunctionalities');

const addItem = async(req,res,next) => {
    if(typeof req.body === 'undefined'){
        logger.info(`undefined req`);
        res.json({
            result : '0',
            message : 'no request content'
        });
    }
    else{
        logger.info(`valid data`);
        await items.insertItemData(req.body,(result)=>{
            if(result.status === 400){
                res.statusCode = result.status,
                res.send(result.data.message);
                return;
            }
            res.json(result.data);
        });
    }
}

const UploadDocumentFuntion =  uploadDoc.handleFileUpload;

const fetchItem = async(req,res,next) => {
    if(typeof req.body === 'undefined'){
        logger.info(`undefined req`);
        res.json({
            result : '0',
            message : 'no request content'
        });
    }
    else{
        logger.info(`valid data`);
        await items.fetchItemData(req.body,(result)=>{
            if(result.status === 400){
                res.statusCode = result.status,
                res.send(result.data.message);
                return;
            }
            res.json(result.data);
        });
    }
}

const fetchAllItem = async(req,res,next) => {
    if(typeof req.body === 'undefined'){
        logger.info(`undefined req`);
        res.json({
            result : '0',
            message : 'no request content'
        });
    }
    else{
        logger.info(`valid data`);
        await items.fetchAllItemsData(req.body,(result)=>{
            if(result.status === 400){
                res.statusCode = result.status,
                res.send(result.data.message);
                return;
            }
            res.json(result.data);
        });
    }
}

const getStatistics = items.fetchStatic;

module.exports = {
    addItem,
    fetchItem,
    fetchAllItem,
    UploadDocumentFuntion,
    getStatistics
}