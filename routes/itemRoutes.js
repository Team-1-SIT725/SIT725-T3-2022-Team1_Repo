var express = require("express");
var router = express.Router();
let controller = require("../controller");

router.post("/add", (req, res) => {
    controller.itemController.addItem(req, res);
});

router.post("/update", (req, res) => {
    controller.itemController.addItem(req, res);
});

router.post("/delete", (req, res) => {
    controller.itemController.addItem(req, res);
});

module.exports = router;
