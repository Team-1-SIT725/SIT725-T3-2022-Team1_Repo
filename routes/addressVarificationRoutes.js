let express = require("express");
let router = express.Router();
let controller = require("../controller");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploadAdr/");
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
        if (!file.originalname.match(/\.(png|jpg|jpeg|pdf)$/)) {
            cb(new Error("Please upload an image."));
        }
        cb(undefined, true);
    },
});

router.post(
    "/add",
    upload.single("id-upload"),
    (req, res) => {
        controller.addressVarController.addForm(req, res);
    },
    (error, req, res, next) => {
        // fs.unlink("upload\file")
        res.status(400).send({ error: error.message });
    }
);
// router.post(
//     "/addressUpload",
//     upload.single("img-upload"),
//     (req, res) => {
//         controller.userProfilePrivateController.addForm(req, res);
//     },
//     (error, req, res, next) => {
//         // fs.unlink("upload\file")
//         res.status(400).send({ error: error.message });
//     }
// );

module.exports = router;