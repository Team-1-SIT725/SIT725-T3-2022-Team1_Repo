//mongoDb connection

require("dotenv").config();

const mongoose = require("mongoose");

let uri;



//Check if we are in prod or dev

if (process.env.NODE_ENV === "development") {

  uri = process.env.MONGO_URI_DEV;

}



if (process.env.NODE_ENV === "production") {

  uri = process.env.MONGO_URI_PROD;

}



main().catch((err) => console.log(err));



async function main() {

  await mongoose.connect(uri);

  console.log("MongoDB Connected Successfully!");

}

