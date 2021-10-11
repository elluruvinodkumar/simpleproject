const userFunctionalities = require('./userFunctionalities');
const userVerify = require('./verifyUser');
const userLogin = require('./loginUser');

const insertUserDetails = (params,callback) => {
    return userFunctionalities.insertUserDetails(params,callback);
}

const verify = (params, callback) => {
    return userVerify.verify(params,callback);
}

const  login = (params, callback) => {
    return userLogin.login(params,callback);
}

module.exports = {
    insertUserDetails,
    verify,
    login
};