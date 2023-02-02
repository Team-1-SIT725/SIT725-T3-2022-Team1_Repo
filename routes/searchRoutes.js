var express = require("express");
var router = express.Router();
let controllers = require("../controllers");

router.get("/", (req, res) => {
    controllers.SearchController.search(req, res);
});

//Not Currently in use
router.get("/item", (req, res) => {
    controllers.SearchController.searchItems(req, res);
});

module.exports = router;
