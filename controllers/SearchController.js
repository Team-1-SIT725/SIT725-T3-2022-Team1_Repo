const models = require("../models");
const item = models.itemModels.item;

const search = async (req, res) => {
    try {
        let result = await item.aggregate().search({
            index: "ItemSearch",
            autocomplete: {
                query: `${req.query.term}`,
                // path: "itemSearch",
                path: "itemName",
                fuzzy: {
                    maxEdits: 2,
                },
            },
        });
        res.json({ statusCode: 200, data: result });
    } catch (err) {
        console.log("Error:", err);
        res.json({ statusCode: 500, message: err });
    }
};

const searchItems = async (req, res) => {
    try {
        let result = await item.aggregate().search({
            index: "default",
            text: {
                query: `${req.query.term}`,
                // path: "itemSearch",
                path: "itemName",
            },
        });
        res.json({ statusCode: 200, data: result });
    } catch (err) {
        console.log("Error:", err);
        res.json({ statusCode: 500, message: err });
    }
};

const searchUser = async (req, res) => {
    try {
        let userID;
        let myitem;

        if (req.params.userID) {
            userID = req.params.userID;
            myitem = await item.find({
                userID: userID,
                itemAvailability: "Available",
            });
        } else {
            userID = req.user._id;
            myitem = await item.find({ userID: userID });
        }

        if (!myitem) throw new Error("Item does not exist");

        res.json({ statusCode: 200, message: "Success", data: myitem });
    } catch (err) {
        console.log("Error", err);
        res.json({ statusCode: 400, message: err });
    }
};

module.exports = {
    search,
    searchItems,
    searchUser,
};
