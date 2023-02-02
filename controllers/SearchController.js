const models = require("../models");
const item = models.itemModels.item;

/*****************************************************************************
Function: search
Author: Phil Williams

Purpose: This function receives an input form the post /api/search route.
based on the search term received it performs a fuzzy search using the MongoDB
search Index ItemSearch. Intended to be used for autocomplete in the search
boxes presently it's being used for main search.
******************************************************************************/
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

/*****************************************************************************
Function: searchItems
Author: Phil Williams

Purpose: This function receives an input form the post /api/search/item route.
Intended to be used for searching items using a different search index. 
Not presently being used.
******************************************************************************/

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
