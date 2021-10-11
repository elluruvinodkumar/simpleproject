const statusCodes = require('../../helpers/statusCodes');
const paramValidator = require('./reviewsParamValidations');
const dbQueries = require('./reviewsDbQueries');
const userDb = require('../user/userDbQueries');

const Logger = require('../../../config/console');
const logger = new Logger().log();

const insertReviewDetails = async (params, callback) => {
    const { error } = paramValidator.validateAddReviewParameters(params);
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
        const checkUser = await userDb.getUserQueryFromUserId(params.reviewedBy);

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
                let newItem = dbQueries.insertReviewDetailsTo(params);
                newItem.save((err) => {
                    logger.info(`insert item review`);
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
                            message: "Item Review Added successfully"
                        }
                    });
                });
            }
        }
   
        
    }

}


module.exports = {
    insertReviewDetails,
};