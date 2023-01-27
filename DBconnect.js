// //mongoDb connection
require("dotenv").config();
const mongoose = require("mongoose");
// let uri;

// //Check if we are in prod or dev
// if (process.env.NODE_ENV === "development") {
//     uri = process.env.MONGO_URI_DEV;
// }

// if (process.env.NODE_ENV === "production") {
//     uri = process.env.MONGO_URI_PROD;
// }
const uri = 'mongodb+srv://Niko:233@cluster0.ela4eij.mongodb.net/?retryWrites=true&w=majority'
// Mongo DB conncetion
mongoose
    .connect(uri, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log("MongoDB Connected Successfully!"))
    .catch((err) => console.log(err));

// const database = "mongodb+srv://Kachi:prac5@cluster0.udrpgld.mongodb.net/?retryWrites=true&w=majority"

// mongoose
//     .connect(database, { useUnifiedTopology: true, useNewUrlParser: true })
//     .then(() => console.log("MongoDB Connected Successfully!"))
//     .catch((err) => console.log(err));
