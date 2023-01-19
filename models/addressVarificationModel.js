const mongoose = require("mongoose");

const personalImagesSchema = mongoose.Schema({
    filePath: {
        type: String,
        require: true,
    },
    originalFilename: {
        type: String,
        require: true,
    },
    newFilename: {
        type: String,
        require: true,
    },
    fileSize: {
        type: Number,
        require: true,
    },
});

const addressSchema = mongoose.Schema({
    address_line_1: {
        type: String,
        require: true,
        maxLength: [250, "Item name cannot be long than 250 characters"],
    },
    address_line_2: {
        type: String,
        require: false,
    },
    suburb: {
        type: String,
        require: true,
    },
    city: {
        type: String,
        require: true,
    },
    postcode: {
        type: String,
        require: true,
    },
    filePath: {
        type: String,
        require: true,
    },
    originalFilename: {
        type: String,
        require: true,
    },
    newFilename: {
        type: String,
        require: true,
    },
    fileSize: {
        type: Number,
        require: true,
    }
    // personalImages: [personalImagesSchema],
});

const Address = mongoose.model("Address", addressSchema);
const personalImages = mongoose.model("personalImages", personalImagesSchema);
module.exports = {
    Address,
    personalImages,
};