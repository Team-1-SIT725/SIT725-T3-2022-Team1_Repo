const models = require("../models");
const item = models.itemModels.item;

const search = async (req, res) => {
    try {
        let result = await item.aggregate().search({
            autocomplete: {
                query: `${req.query.term}`,
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

const searchItems = async (req, res) => {};

const searchUser = async (req, res) => {};

module.exports = {
    search,
    searchItems,
    searchUser,
};
