const statusCodes = require('../../helpers/statusCodes');
//const statusMessages = require('../Core/StatusMessages');
const paramValidations = require('./itemParamValidations');
const dbQueries = require('./itemsDbQueries');

const Logger = require('../../../config/console');
const logger = new Logger().log();

const fetchAllItemsFun = async (params, callback) => {
    const { error } = paramValidations.validateFetchAllItemsParams(params);
    if (error) {
        logger.info(`validation failed`);
        return callback({
            status: 400,
            data: {
                response: statusCodes.failure,
                message: error.details[0].message
            }
        });
    }
    let getAllItemsQuery = dbQueries.getAllItemsData(params);
    const foundData = await getAllItemsQuery;
        if (foundData) {           
            logger.info(`fetch all items`);     
            callback({
                status: 200,
                data: {
                    response: statusCodes.success,
                    message: "Available Items",
                    availableItemsList: foundData
                }
            });
            return;    
        } 
        else {
            callback({ 
                status: 200, 
                data: { 
                    response: statusCodes.failure, 
                    message: "No data found with us. Please add data" 
                } 
            });
            return
        }

}

module.exports = {
    fetchAllItemsFun
};