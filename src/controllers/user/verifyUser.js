const statusCodes = require('../../helpers/statusCodes');
//const statusMessages = require('../core/statusMessages');
const config = require('../../helpers/config.json');
const paramValidations = require('./userParamValidations');
const dbQueries = require('./userDbQueries');
const jwt = require('jsonwebtoken');
const Logger = require('../../../config/console');
const logger = new Logger().log();


const verify = async (params, callback) => {
    const { error } = paramValidations.validateVerifyParams(params);
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
    let query = dbQueries.getUserQueryFromUserId(params.emailId);
    const userFound = await query;
        if (userFound) {
            logger.info(`verifcation`);
            const timeNow = new Date().getTime().toString();
            const otp_time = userFound.otp_time;
            const timeDifference = timeNow-otp_time;
            console.log(timeDifference);
            //timeDifference<=118330.5 && timeDifference>1
            if(userFound.verified === false){
                if (userFound.otp === params.otp) {
                    // eslint-disable-next-line no-undef
                    const token = jwt.sign({ id: userFound.emailId }, config.secretkey);
                    let updateQuery = dbQueries.prepareUserUpdate(params.emailId, true);
                    const updated_record = await updateQuery;
                        if (updated_record) {
                            callback({
                                status: 200,
                                data: {
                                    response: statusCodes.success,
                                    message: "Customer verified successfully",
                                    customerInfo: userFound,
                                    access_token: token
                                }
                            });
                            return;
                        } else {
                            callback({ 
                                status: 200, 
                                data: { 
                                    response: statusCodes.success, 
                                    message: "Customer verification failed",
                                    customerInfo: userFound
                                }
                            });
                            return;
                        }
                } else {
                    callback({ 
                        status: 200, 
                        data: { 
                            response: statusCodes.failure, 
                            message: "Entered OTP is wrong" 
                        } 
                    });
                    return;
                }
            }else{
                callback({
                    status: 200,
                    data: {
                        response: statusCodes.failure,
                        message: "OTP timed out"
                    }
                });
                return;
            }
        } else {
            callback({ 
                status: 200, 
                data: { 
                    response: statusCodes.failure, 
                    message: "No data found with us. Please register with us." 
                } 
            });
            return;
        }
}

module.exports = {
    verify
};
