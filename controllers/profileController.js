const models = require("../models");
const item = models.itemModels.item;
const User = require("../models/User");
const path = require("path");

const profileUser = async (req, res) => {
    let data;
    try {
        if (req.query.userID) {
            await User.findOne({ _id: req.query.userID })
                .then((user) => {
                    if (user) {
                        data = {
                            user: user.name,
                            location: user.location,
                            userID: user._id,
                            verified: user.addressVer,
                            profileImg: user.profileImgFilename,
                        };
                        res.json({
                            statusCode: 200,
                            message: "Success",
                            data: data,
                        });
                    } else {
                        res.json({
                            statusCode: 204,
                            message: "No user found",
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                    res.json({ statusCode: 400, message: err });
                });
        } else {
            data = {
                user: req.user.name,
                location: req.user.location,
                userID: req.user._id,
                verified: req.user.addressVer,
                profileImg: req.user.profileImgFilename,
            };
            return res.json({
                statusCode: 200,
                message: "Success",
                data: data,
            });
        }
    } catch (err) {
        console.log("Error", err);
        res.json({ statusCode: 400, message: err });
    }
};

const userItems = async (req, res) => {
    try {
        let userID;
        let myitem;

        if (req.query.userID) {
            userID = req.query.userID;
            myitem = await item.find({
                userID: userID,
                itemAvailability: "Available",
            });
        } else {
            userID = req.user._id;
            myitem = await item.find({ userID: userID });
        }

        if (!myitem) {
            res.json({ statusCode: 204, message: "No available items" });
        } else {
            res.json({ statusCode: 200, message: "Success", data: myitem });
        }
    } catch (err) {
        console.log("Error", err);
        res.json({ statusCode: 400, message: err });
    }
};

const profileImgUpload = async (req, res) => {
    try {
        await User.updateOne(
            { _id: req.user._id },
            { $set: { profileImgFilename: req.file.filename } }
        );
        res.json({
            statusCode: 200,
            message: `Profile image uploaded`,
        });
    } catch (err) {
        console.log("Error", err);
        res.json({ statusCode: 400, message: err });
    }
};

const profileImg = async (req, res) => {
    try {
        res.sendFile(
            path.join(__dirname, "../profile-img/" + req.params.filename)
        );
    } catch (err) {
        console.log("Error MSG");
        //set error handling
    }
};
module.exports = {
    profileUser,
    userItems,
    profileImgUpload,
    profileImg,
};
