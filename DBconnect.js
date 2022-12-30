// require('dotenv').config() //it helps you work with all environments
// const mongoose = require('mongoose');


// const connectDB = async () => {
//   const uri = 'mongodb+srv://Niko:233@cluster0.ela4eij.mongodb.net/?retryWrites=true&w=majority'
//   const conn = await mongoose.connect(uri, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true
//   });


//   console.log(`MongoDB Connected: ${conn.connection.host}`);
// };


// module.exports = connectDB;
// mongoDb connection
require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;
// let uri;
const uri = 'mongodb+srv://Niko:233@cluster0.ela4eij.mongodb.net/?retryWrites=true&w=majority'


// //Check if we are in prod or dev
// if (process.env.NODE_ENV === "development") {
//   uri = process.env.MONGO_URI_DEV;
// }

// if (process.env.NODE_ENV === "production") {
//   uri = process.env.MONGO_URI_PROD;
// }

const client = new MongoClient(uri, { useNewUrlParser: true });

client.connect((err, db) => {
  if (!err) {
    console.log("MongoDB Connected");
  } else {
    console.log("DB Error: ", err);
    process.exit(1);
  }
});

module.exports = client;
