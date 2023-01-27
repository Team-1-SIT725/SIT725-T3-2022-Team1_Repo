var express = require("express");
const controllers = require("../controllers");
var router = express.Router();

router.get("/", (req, res) => {
    controllers.profileController.profileUser(req, res);
});

router.get("/items", (req, res) => {
    controllers.profileController.userItems(req, res);
});

module.exports = router;
