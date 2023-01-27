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
const http = require("http");
const httpserver = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(httpserver);

const {onSocket} = require("./controllers/chatController");

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(cors());
onSocket(io)

//BodyParsing
app.use(express.urlencoded({ extended: false }));
app.use(
    session({
        secret: "oneboy",
        saveUninitialized: true,
        resave: true,
    })
);
//const httpServer = createServer(app);



app.use(passport.initialize());
app.use(passport.session());
//Routes

app.use("/", require("./routes/login"));
app.use("/api", Routes);

const PORT = process.env.PORT || 3000;
httpserver.listen(PORT, console.log("Server has started at port " + PORT));
