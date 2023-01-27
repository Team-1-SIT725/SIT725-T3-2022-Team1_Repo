const models = require("../models");
const item = models.itemModels.item;
const itemImages = models.itemModels.itemImages;
const User = require("../models/User");
const path = require("path");
const fs = require("fs");
const { name } = require("ejs");
const { default: mongoose } = require("mongoose");
const { func } = require("joi");

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
    let userID = req.user._id;
    let itemAvailability = req.body.itemAvailability;

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
        userID: userID,
        itemAvailability: itemAvailability,
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
    try {
        const itemID = req.params.itemID;
        const myitem = await item.findOne({ _id: itemID }).lean();
        if (!myitem) throw new Error("Item does not exist");

        let sameUser = false;
        if (myitem.userID == req.user._id) {
            sameUser = true;
        }
        const itemUser = await User.findOne({ _id: myitem.userID }).then(
            (user) => {
                if (user) {
                    return user._doc.name;
                } else {
                    return "User Name Missing";
                }
            }
        );
        myitem.postingUserName = itemUser;
        myitem.sameUser = sameUser;

        res.json({
            statusCode: 200,
            message: "Success",
            data: myitem,
        });
    } catch (err) {
        console.log("Error", err);
        res.json({ statusCode: 400, message: err });
    }
};

const itemImage = async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, "../upload/" + req.params.filename));
    } catch {
        console.log("Error MSG");
        //set error handling
    }
};

const deleteItem = async (req, res) => {
    const itemID = req.params.itemID;
    try {
        const myitem = await item.findOne({ _id: itemID }).lean();
        // if (!myitem) throw new Error("Item does not exist");
        if (!myitem)
            return res.json({ statusCode: 400, message: "Item not found" });
        if (myitem.userID == req.user._id) {
            myitem.itemImages.forEach((element) => {
                fs.unlink(`./upload/${element.newFilename}`, (err) => {
                    if (err) console.log(err);
                });
            });

            await item
                .deleteOne({ _id: itemID }, function (err) {
                    if (err) {
                        res.json({ statusCode: 400, message: err });
                    }
                    res.json({
                        statusCode: 200,
                        message: `Item ${myitem.itemName} Deleted`,
                    });
                })
                .clone();
        }
    } catch (err) {
        return res.json({ statusCode: 400, message: err });
    }
};

const updateAvailability = async (req, res) => {
    const status = req.params.status;
    const itemID = req.params.itemID;
    try {
        await item.updateOne(
            { _id: itemID },
            { $set: { itemAvailability: status } }
        );
        res.json({
            statusCode: 200,
            message: `Item status changed to ${status}`,
        });
    } catch (err) {
        return res.json({ statusCode: 400, message: err });
    }
};

module.exports = {
    addItem,
    viewItem,
    itemImage,
    deleteItem,
    updateAvailability,
};
