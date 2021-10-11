const documentDb = require('../../models/documentVerify');

const  insertDocumentDetails = (params)=>{
    const addDocument = new documentDb({
        sellerId : params.emailId,
        sellerCompanyDetails : params.companyDetails,
        sellerPersonalDetails : params.personalDetails,
        documentVerification : true,
        documentUrl : params.url
    });
    return addDocument;
}

const updateDocumentDetails = (params) =>{
    console.log("update query data...",params);
    return documentDb.updateOne({ sellerId: new RegExp(params.emailId, 'i') }, {
        $set: {
            sellerId : params.emailId,
            sellerCompanyDetails : params.companyDetails,
            sellerPersonalDetails : params.personalDetails,
            documentVerification : true,
            documentUrl : params.url
        }
    }).exec()
}

const getAvailableUser = (emailId) => {
    console.log("get available user...",emailId);
    const query = { 
        $or: [{ 
                sellerId: { $regex: emailId, $options: 'i' }
            }] 
    }
    return documentDb.findOne(query,{_id: 0, __v: 0}).exec()
}

module.exports = {
    insertDocumentDetails,
    updateDocumentDetails,
    getAvailableUser
}