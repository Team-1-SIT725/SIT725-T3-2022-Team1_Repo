let express = require("express");
let router = express.Router();
let controller = require("../controllers");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "upload/");
    },

    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
    },
});
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000,
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            cb(new Error("Please upload an image."));
        }
        cb(undefined, true);
    },
});

router.post(
    "/add",
    upload.array("photos", 12),
    (req, res) => {
        controller.itemController.addItem(req, res);
    },
    (error, req, res, next) => {
        // fs.unlink("upload\file")
        res.status(400).send({ error: error.message });
    }
);

router.post("/update", (req, res) => {
    controller.itemController.addItem(req, res);
});

router.post("/delete", (req, res) => {
    controller.itemController.addItem(req, res);
});

router.get("/view/:itemID/", (req, res) => {
    controller.itemController.viewItem(req, res);
});

router.get("/itemimage/:filename/", (req, res) => {
    controller.itemController.itemImage(req, res);
});

module.exports = router;
