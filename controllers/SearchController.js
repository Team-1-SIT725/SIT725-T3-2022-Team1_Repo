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

//Not currently in use
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

module.exports = {
    search,
    searchItems,
};
