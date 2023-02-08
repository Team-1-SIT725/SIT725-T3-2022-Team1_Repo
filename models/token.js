const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Token schema which stores the token generated for a user
const tokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600,
    },
});
const token = mongoose.model("Token", tokenSchema);
module.exports = { token };
