var express = require("express");
var router = express.Router();
let controllers = require("../controllers");

router.get("/", (req, res) => {
    controllers.SearchController.search(req, res);
});

router.get("/item", (req, res) => {
    controllers.SearchController.searchItems(req, res);
});

router.get("/user/:userID?", (req, res) => {
    controllers.SearchController.searchUser(req, res);
});

module.exports = router;
