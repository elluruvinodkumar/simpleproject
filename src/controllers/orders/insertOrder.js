const statusCodes = require('../../helpers/statusCodes');
const paramValidator = require('./orderParamValidations');
const dbQueries = require('./orderDbQueries');
const userDb = require('../user/userDbQueries');

const Logger = require('../../../config/console');
const logger = new Logger().log();

const insertItemDetails = async (params, callback) => {
    const { error } = paramValidator.validateAddItemParameters(params);
    if (error) {
        logger.info(`validation failed`);
         callback({
            status: 400,
            data: {
                response: statusCodes.failure,
                message: error.details[0].message
            }
        });
        return;
    }
    else{
        const checkUser = await userDb.getUserQueryFromUserId(params.emailId);

        if(!checkUser){
            return callback({
                status: 200,
                data: {
                    response: statusCodes.failure,
                    message: "User don't have account."
                }
            });            
        }
        else{
            if(checkUser.verified === false){
                return callback({
                    status: 200,
                    data: {
                        response: statusCodes.failure,
                        message: "User verification is pending."
                    }
                });   
            }
            else{
                let newItem = dbQueries.insertItemDetailsTo(params);
                newItem.save((err) => {
                    logger.info(`insert order data`);
                    if (err) {
                        callback({
                            status: 200,
                            data: {
                                response: statusCodes.failure,
                                message: err
                            }
                        });
                        return
                    }
                    callback({
                        status: 200,
                        data: {
                            response: statusCodes.success,
                            message: "Order Added successfully"
                        }
                    });
                });
            }
        }
   
        
    }


    

}


module.exports = {
    insertItemDetails,
};