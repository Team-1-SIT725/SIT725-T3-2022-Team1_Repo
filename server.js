require("dotenv").config();
var express = require("express");
var app = express();
var cors = require("cors");
let Routes = require("./routes");
let dbConnect = require('./DBconnect');



//database connection


// connectDB();

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/api", Routes);

var port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("App listening to: " + port);
});
