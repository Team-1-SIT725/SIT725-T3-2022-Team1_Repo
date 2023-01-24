var express = require("express");
const controllers = require("../controllers");
var router = express.Router();

// router.get("/", (req, res) => {
//     //controller.itemController.addItem(req, res);
//     controllers.profileController.profileUser(req, res);
// });

router.get("/:userID?", (req, res) => {
    //controller.itemController.addItem(req, res);
    controllers.profileController.profileUser(req, res);
});

module.exports = router;
