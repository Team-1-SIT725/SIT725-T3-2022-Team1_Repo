const models = require("../models");
const item = models.itemModels.item;
const itemImages = models.itemModels.itemImages;
const path = require("path");


const addItem = async (req, res) => {


    //Store Variables from req

    let itemName = req.body.itemName;
    let itemCategory = req.body.itemCategory;
    let itemDescription = req.body.itemDescription;
    let itemCondition = req.body.itemCondition;
    let itemSize = req.body.itemSize;
    let itemColour = req.body.itemColour;
    let itemValue = req.body.itemValue;
    let itemImagesArray = [];

    //Validate Outputs

    for (let i = 0; i < req.files.length; i++) {
        const newImage = new itemImages({
            filePath: req.files[i].path,
            originalFilename: req.files[i].originalname,
            newFilename: req.files[i].filename,
            fileSize: req.files[i].size,
        });
        itemImagesArray.push(newImage);
    }

    //
    const newItem = new item({
        itemName: itemName,
        itemCategory: itemCategory,
        itemDescription: itemDescription,
        itemCondition: itemCondition,
        itemSize: itemSize,
        itemColour: itemColour,
        itemValue: itemValue,
        itemImages: itemImagesArray,
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

const viewItem = async (req, res) => {
    const itemID = req.params.itemID;
    const myitem = await item.findOne({ _id: itemID });
    if (!myitem) throw new Error("Item does not exist");

    res.json({ statusCode: 200, message: "Success", data: myitem });
    // .catch((err) => {
    //     console.log("Error", err);
    //     res.json({ statusCode: 400, message: err });
    // })
};

const itemImage = async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, "../upload/" + req.params.filename));
    } catch (e) {
        console.log(`Error MSG: ${e.message}`);
        //set error handling
    }
};

module.exports = {
    addItem,
    viewItem,
    itemImage,
};
