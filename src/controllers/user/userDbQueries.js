const userDb = require('../../models/users');
const bcrypt = require('bcryptjs');

const  insertUserDetails = (params,otp)=>{
    let hashedPassword = bcrypt.hashSync(params.password, 8);
    const addUser = new userDb({
        emailId : params.emailId,
        userType : params.userType,
        name:{
            firstName : params.firstName,
            lastName : params.lastName,
        },
        password: hashedPassword,
        otp: otp,
        address : params.address,
        phoneNumber : params.phoneNumber
    });
    return addUser;
}

const getUserQueryFromUserId = (emailId) => {
    const query = { 
        $or: [{ 
                emailId: { $regex: emailId, $options: 'i' }
            }] 
    }
    return userDb.findOne(query,{_id: 0, __v: 0}).exec()
}

const  unVerifiedCustomerQuery = (params, otp) => {
    let hashedPassword = bcrypt.hashSync(params.password, 8);
    const register_timestamp = new Date().getTime().toString()
    return userDb.updateOne({ email_Id: new RegExp(params.emailId, 'i')},
    {
        $set: {
            emailId: params.emailId,
            userType:params.userType,
            password: hashedPassword,
            name:{
                firstName : params.firstName,
                lastName : params.lastName,
            },
            otp: otp,
            otp_time: register_timestamp,
            register_type: params.register_type,
            register_time: register_timestamp,
            address : params.address,
            phoneNumber : params.phoneNumber
        }
    }).exec()
}

const  prepareUserUpdate = (emailId, isVerified) => {
    return userDb.updateOne({ emailId: new RegExp(emailId, 'i') }, {
        $set: {
            verified: isVerified,
        }
    }).exec()
}

const  getCustomerQuery = (params) => {
    const query = { 
        $or: [{ 
            emailId: { $regex: params.emailId, $options: 'i' } 
            }] 
    }
    return userDb.findOne(query, {_id: 0, __v: 0}).exec()

}


module.exports = {
    unVerifiedCustomerQuery,
    insertUserDetails,
    getUserQueryFromUserId,
    getCustomerQuery,
    prepareUserUpdate
};