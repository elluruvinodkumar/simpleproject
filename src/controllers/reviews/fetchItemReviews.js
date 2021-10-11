const statusCodes = require('../../helpers/statusCodes');
//const statusMessages = require('../Core/StatusMessages');
const paramValidations = require('./reviewsParamValidations');
const dbQueries = require('./reviewsDbQueries');

const Logger = require('../../../config/console');
const logger = new Logger().log();

const fetchItemReviewsFun = async (params, callback) => {
    const { error } = paramValidations.validateFetchReviewParams(params);
    if (error) {
        logger.info(`validation failed`);
        return callback({
            status: 400,
            data: {
                response: statusCodes.failure,
                message: "validation failed"
            }
        });
    }
    else{
        let getAllItemsQuery = dbQueries.getItemReviewsData(params);
        const foundData = await getAllItemsQuery;
        if (foundData) {           
            logger.info(`fetch item reviws`);     
            callback({
                status: 200,
                data: {
                    response: statusCodes.success,
                    message: "Item Reviews",
                    ItemReviewsList: foundData
                }
            });
            return;    
        } 
        else {
            callback({ 
                status: 200, 
                data: { 
                    response: statusCodes.failure, 
                    message: "No reviews found." 
                } 
            });
            return
        }
    }

}

module.exports = {
    fetchItemReviewsFun
};