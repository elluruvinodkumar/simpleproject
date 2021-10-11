const statusCodes = require('../../helpers/statusCodes');
const paramValidator = require('./itemParamValidations');
const dbQueries = require('./itemsDbQueries');;

const insertItemDetails = async (params, callback) => {
    const { error } = paramValidator.validateAddItemParameters(params);
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

    let newItem = dbQueries.insertItemDetailsTo(params);
    newItem.save((err) => {
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
                message: "Item Added successfully"
            }
        });
    });

    //let customer_query = dbQueries.getItemData(params);
    // const userFound = await customer_query;
    //     if (userFound) {
    //          callback({
    //                 status: 200,
    //                 data: {
    //                     response: statusCodes.failure,
    //                     message: "Item available."
    //                 }
    //             });
    //             return;
             
    //     } else {
    //         let newItem = await dbQueries.insertItemDetails(params);
    //         newItem.save((err) => {
    //             if (err) {
    //                 callback({
    //                     status: 200,
    //                     data: {
    //                         response: statusCodes.failure,
    //                         message: err
    //                     }
    //                 });
    //                 return
    //             }
    //             callback({
    //                 status: 200,
    //                 data: {
    //                     response: statusCodes.success,
    //                     message: "Item Added successfully"
    //                 }
    //             });
    //         });
    //     }
}

const getStatistics = dbQueries.getStatc;

module.exports = {
    insertItemDetails,
    getStatistics
};