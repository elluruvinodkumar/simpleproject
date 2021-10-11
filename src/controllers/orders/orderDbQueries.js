const itemDb = require('../../models/order');

const  insertItemDetailsTo = (params)=>{
    const addItem = new itemDb({
        emailId:params.emailId,
        products: params.products,
        amount: params.amount,
        address: params.address,
         // status: params.status,
    });
    return addItem;
}

module.exports = {
    insertItemDetailsTo,
};

