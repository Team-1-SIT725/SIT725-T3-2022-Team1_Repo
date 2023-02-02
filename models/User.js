const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); //bcrypt hashing function allows us to build a
// password security platform that scales with computation power and always hashes every password 
const bcryptSalt = 10;

// // User Schema
//this page shows the schema created to store the user details in Mongo DB
//each value defined here is stored under a registered user
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
