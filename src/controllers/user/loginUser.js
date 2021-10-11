const statusCodes = require('../../helpers/statusCodes');
//const statusMessages = require('../Core/StatusMessages');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../helpers/config.json');
const paramValidations = require('./userParamValidations');
const dbQueries = require('./userDbQueries');
const Logger = require('../../../config/console');
const logger = new Logger().log();

const login = async (params, callback) => {
    const { error } = paramValidations.validateLoginParams(params);
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
    let loginQuery = dbQueries.getCustomerQuery(params);
    const foundData = await loginQuery;
        if (foundData) {
            logger.info(`user login`);
            const validPassword = bcrypt.compareSync(params.password, foundData.password);                
            if (!validPassword) {
                callback({ status: 200, data: 
                    { response: statusCodes.failure, message: "Login failed, either username/password is wrong" } 
                });
                return;
            } 
             if (foundData.verified === true) {
                const token = jwt.sign({ id: foundData.emailId }, config.secretkey);//{expiresIn:"2d"}
                callback({
                    status: 200,
                    data: {
                        response: statusCodes.success,
                        message: "Customer user login success",
                        access_token: token,
                        customerInfo: foundData
                    }
                });
                return;
               
            } else {
                callback({ status: 200, 
                    data: { response: statusCodes.verificationPending, message: "Customer is registered but verification is pending" } });
                return;
            }
        } else {
            callback({ status: 200, data: { response: statusCodes.failure, message: "No data found with us. Please register with us" } });
            return
        }

}

module.exports = {
    login
};