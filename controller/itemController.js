const models = require("../models");
const item = models.itemModels.item;

const addItem = (req, res) => {
    //Store Variables from req
    let itemName = req.body.itemName;
    let itemCategory = req.body.itemCategory;
    let itemDescription = req.body.itemDescription;
    let itemCondition = req.body.itemCondition;
    let itemSize = req.body.itemSize;
    let itemColour = req.body.itemColour;
    let itemValue = req.body.itemValue;

    //Validate Outputs

    //
    const newItem = new item({
        itemName: itemName,
        itemCategory: itemCategory,
        itemDescription: itemDescription,
        itemCondition: itemCondition,
        itemSize: itemSize,
        itemColour: itemColour,
        itemValue: itemValue,
    });

    newItem
        .save()
        .then((result) => {
            res.json({
                statusCode: 200,
                message: "Item Successfully added",
                data: result,
            });
        })

        .catch((err) => {
            console.log("Error", err);
            res.json({ statusCode: 400, message: err });
        });
};

module.exports = {
    addItem,
};
