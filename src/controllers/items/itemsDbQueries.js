const itemDb = require('../../models/item');

const  insertItemDetailsTo = (params)=>{
    console.log("items to insert...",params.category);
    const addItem = new itemDb({
        emailId:params.emailId,
        title:params.title,
        description:params.description,
        // category:params.category,
        // category:params.category,
        category:params.category,
        // category:{
        //     subCategory:params.category[0].subCategory,
        //     item:params.category[0].item
        // },
        price:params.price,
        pics:{
            url:params.pics
        }
    });
    return addItem;
}

const getItemData = (emailId) => {
    const query = { 
        $or: [{ 
                emailId: { $regex: emailId, $options: 'i' }
            }] 
    }
    return itemDb.findOne(query,{_id: 0, __v: 0}).exec()
}

const  getAllItemsData = (params) => {
    const query = { 
        $or: [{ 
            emailId: { $regex: params.emailId, $options: 'i' } 
            }] 
    }
    return itemDb.find(query, {__v: 0}).exec()

}

const getStatc = async(req,res)=>{
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    try{
        const data = await itemDb.aggregate([
            { $match : {
                createdAt : { $gte : lastYear}
            } },
            {
                $project:{
                    month : { $month : "$createdAt"}
                },
            },
            {
                $group:{
                    _id:"$month",
                    ItemsCount:{$sum:1}
                }
            }
        ]);
        res.status(200).json(data);
    }
    catch (err){
        res.status(500).json(err);
    }
}


module.exports = {
    insertItemDetailsTo,
    getItemData,
    getAllItemsData,
    getStatc
};