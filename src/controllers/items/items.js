const addItem = require('./insertItem');
const fetchSingleItem = require('./fetchItem');
const fetchAllItems = require('./fetchAllItems');

const insertItemData = (params,callback) => {
    return addItem.insertItemDetails(params,callback);
}

const fetchItemData = (params, callback) => {
    return fetchSingleItem.verify(params,callback);
}

const  fetchAllItemsData = (params, callback) => {
    return fetchAllItems.fetchAllItemsFun(params,callback);
}

const  fetchStatic = (params, callback) => {
    return addItem.getStatistics(params,callback);
}


module.exports = {
    insertItemData,
    fetchItemData,
    fetchAllItemsData,
    fetchStatic
};