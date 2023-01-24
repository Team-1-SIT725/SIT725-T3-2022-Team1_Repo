const mongoose = require("mongoose");

const itemImagesSchema = mongoose.Schema({
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

//DB schema for Items
const itemSchema = mongoose.Schema({
    itemName: {
        type: String,
        require: true,
        maxLength: [250, "Item name cannot be long than 250 characters"],
    },
    itemCategory: {
        type: String,
        require: true,
    },
    itemDescription: {
        type: String,
        require: true,
    },
    itemCondition: {
        type: String,
        enum: {
            values: ["New", "Like New", "Light Use", "Used"],
            message: "{VALUE} is not a valid choice",
        },
    },
    itemAvailability: {
        type: String,
        enum: {
            values: ["Available", "Unavailable", "Hidden"],
            message: "{VALUE} is not a valid choice",
        },
    },
    itemSize: {
        type: String,
        require: false,
    },
    itemColour: {
        type: String,
        require: false,
    },
    itemValue: {
        type: Number,
        require: false,
        max: [50000, "{VALUE} Exceeds the maximum value of $50,000"],
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    userID: {
        type: String,
        require: true, //change this to true in a clean DB
    },
    itemImages: [itemImagesSchema],
});

const item = mongoose.model("item", itemSchema);
const itemImages = mongoose.model("itemImages", itemImagesSchema);
module.exports = {
    item,
    itemImages,
};
