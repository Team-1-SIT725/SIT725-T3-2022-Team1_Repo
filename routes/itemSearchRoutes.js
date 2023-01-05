var express = require("express");
var router = express.Router();
let controller = require("../controller");

router.get("/", (req, res) => {
    controller.itemSearchController.search(req, res);
});

router.get("/user", (req, res) => {
    controller.itemSearchController.userItems(req, res);
});

module.exports = router;
