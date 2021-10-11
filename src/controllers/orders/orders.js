const addItem = require('./insertOrder');

const insertItemData = (params,callback) => {
    return addItem.insertItemDetails(params,callback);
}

module.exports = {
    insertItemData,
};