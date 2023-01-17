require("express-async-errors");
require("dotenv").config(); //it helps you work with all environments

const express = require("express");
//const path = require('path');
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const session = require("express-session");
dotenv.config();
const passport = require("passport");
var cors = require("cors");
let DBconnect = require("./DBconnect");
let Routes = require("./routes");
const { loginCheck } = require("./auth/passport");
loginCheck(passport);

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(cors());

//BodyParsing
app.use(express.urlencoded({ extended: false }));
app.use(
    session({
        secret: "oneboy",
        saveUninitialized: true,
        resave: true,
    })
);

app.use(passport.initialize());
app.use(passport.session());
//Routes

app.use("/", require("./routes/login"));
app.use("/api", Routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log("Server has started at port " + PORT));
