const statusCodes = require('../../helpers/statusCodes');
const paramValidator = require('./userParamValidations');
const dbQueries = require('./userDbQueries');
const GenerateOTP = require('../../helpers/generateOtp');
const Mailer = require('../../helpers/mailer');

const insertUserDetails = async (params, callback) => {
    const { error } = paramValidator.validateUserDetailsParams(params);
    if (error) {
         callback({
            status: 400,
            data: {
                response: statusCodes.failure,
                message: error.details[0].message
            }
        });
        return;
    }

    let customer_query = dbQueries.getCustomerQuery(params);
    const userFound = await customer_query;
        if (userFound) {
             callback({
                    status: 200,
                    data: {
                        response: statusCodes.failure,
                        message: "Customer already having account withus."
                    }
                });
                return;
             
        } else {
            let otp = await GenerateOTP.generateOTP();
            let newUser = await dbQueries.insertUserDetails(params, otp);
            newUser.save((err) => {
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
                Mailer.userOTPSentToMail('Registration - OTP', params.emailId,otp);
                callback({
                    status: 200,
                    data: {
                        response: statusCodes.success,
                        message: "Customer registered successfully. Please verify account with OTP",
                        otp: otp
                    }
                });
            });
        }
}

module.exports = {
    insertUserDetails
};