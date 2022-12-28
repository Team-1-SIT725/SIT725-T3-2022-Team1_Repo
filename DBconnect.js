//mongoDb connection
require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;
let uri;

//Check if we are in prod or dev
if (process.env.NODE_ENV === "development") {
  uri = process.env.MONGO_URI_DEV;
}

if (process.env.NODE_ENV === "production") {
  uri = process.env.MONGO_URI_PROD;
}

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
