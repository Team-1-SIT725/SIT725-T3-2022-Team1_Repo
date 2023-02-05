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
const controllers = require("./controllers");
const http = require("http");
const httpserver = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(httpserver);

const { onSocket } = require("./controllers/chatController");
onSocket(io);

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(cors());

//BodyParsing
app.use(express.urlencoded({ extended: false }));

//set session up as middle ware so it can be used by passport and socket.io
const sessionMiddleware = session({
    secret: "oneboy",
    saveUninitialized: true,
    resave: true,
});
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

//Created a new name space for notification sockets
const noteMsg = io.of("/Notifications");
// convert a connect middleware to a Socket.IO middleware so socket.io can use passport sessions
const wrap = (middleware) => (socket, next) =>
    middleware(socket.request, {}, next);
noteMsg.use(wrap(sessionMiddleware));
noteMsg.use(wrap(passport.initialize()));
noteMsg.use(wrap(passport.session()));

controllers.itemController.notificationSocket(noteMsg);

//Routes
app.use("/", require("./routes/login"));
app.use("/api", Routes);

const PORT = process.env.PORT || 3000;
httpserver.listen(PORT, console.log("Server has started at port " + PORT));
