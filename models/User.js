const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
//const MongoClient = require('mongodb').MongoClient;

// // User Schema
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    addressVer: {
        type: Boolean,
        default: false,
    },
    profileImgFilename: {
        type: String,
        require: false,
    },
});
const User = mongoose.model("User", UserSchema);
module.exports = User;
