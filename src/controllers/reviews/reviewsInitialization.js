const reviews = require('./reviews');
const Logger = require('../../../config/console');
const logger = new Logger().log();

const addReview = async(req,res,next) => {
    if(typeof req.body === 'undefined'){
        logger.info(`undefined req`);
        res.json({
            result : '0',
            message : 'no request content'
        });
    }
    else{
        logger.info(`valid data`);
        await reviews.insertReviewData(req.body,(result)=>{
            if(result.status === 400){
                res.statusCode = result.status,
                res.send(result.data.message);
                return;
            }
            res.json(result.data);
        });
    }
}

const fetchItemReviewData = async(req,res,next) => {
    if(typeof req.body === 'undefined'){
        logger.info(`undefined req`);
        res.json({
            result : '0',
            message : 'no request content'
        });
    }
    else{
        logger.info(`valid data`);
        await reviews.fetchItemReviewData(req.body,(result)=>{
            if(result.status === 400){
                res.statusCode = result.status,
                res.send(result.data.message);
                return;
            }
            res.json(result.data);
        });
    }
}


module.exports = {
    addReview,
    fetchItemReviewData
}