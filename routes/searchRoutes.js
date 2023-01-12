var express = require("express");
var router = express.Router();
let controller = require("../controller");

router.get("/", (req, res) => {
    controller.SearchController.search(req, res);
});

router.get("/item", (req, res) => {
    controller.SearchController.searchItems(req, res);
});

router.get("/user", (req, res) => {
    controller.SearchController.searchUser(req, res);
});

module.exports = router;
