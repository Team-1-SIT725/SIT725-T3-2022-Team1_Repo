var express = require("express");
const controllers = require("../controllers");
var router = express.Router();
const multer = require("multer");
const path = require("path");

//the below code is used to store the uploded files to the database
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "profile-img/");
    },

    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
    },
});
//setting some constraints to the file upload such as the max file to be uploaded and file formats
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
router.get("/", (req, res) => {
    controllers.profileController.profileUser(req, res);
});

router.get("/items", (req, res) => {
    controllers.profileController.userItems(req, res);
});

//sendng the response back to the client via post
router.post(
    "/saveProfileImg",
    upload.single("profile-img-upload"),
    (req, res) => {
        controllers.profileController.profileImgUpload(req, res);
    }
);

router.get("/profileImg/:filename/", (req, res) => {
    controllers.profileController.profileImg(req, res);
});

module.exports = router;
