require("express-async-errors");
require('dotenv').config() //it helps you work with all environments

const express = require("express");
//const path = require('path');
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const session = require('express-session');
dotenv.config();
const passport = require("passport");
var cors = require("cors")
let DBconnect = require("./DBconnect");
let Routes = require("./routes");
const { loginCheck } = require("./auth/passport");
loginCheck(passport);
// const createServer = require("http").createServer;
// import { createServer } from "http";
// const {Server} = require("socket.io");
// import { Server } from "socket.io";
// import { fileURLToPath } from "url";
// import { dirname } from "path";
// import onSocket from "./socket.js";

const http = require("http");
const httpserver = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(httpserver);

const {onSocket} = require("./socket");


app.get("/", (req, res) => {
	res.sendFile(__dirname + "/public/index.html");
});

app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(cors())

// const httpServer = createServer(app);

onSocket(io)



//BodyParsing
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret:'oneboy',
    saveUninitialized: true,
    resave: true
  }));
  

app.use(passport.initialize());
app.use(passport.session());
//Routes

app.use("/", require("./routes/login"));
app.use("/api", Routes);

// app.get("/", function (req, res) {
//   res.render("index");
// });

const PORT = process.env.PORT || 3000;

httpserver.listen(PORT, console.log("Server has started at port " + PORT));

// var express = require("express")
// var app = express()
// var cors = require("cors")
// let dbConnect = require("./dbConnect");
// let projectRoutes = require("./routes/projectRoutes");


// app.use(express.static(__dirname + '/public'))
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cors())
// app.use('/api/projects', projectRoutes)

// app.get('/addTwoNumbers/:firstNumber/:secondNumber', function(req,res,next)
// {
//     var firstNumber = parseInt(req.params.firstNumber) 
//     var secondNumber = parseInt(req.params.secondNumber)
//     var result = firstNumber + secondNumber || null
//     if(result == null) {
//       res.json({result: result, statusCode: 400}).status(400)
//     }
//     else { res.json({result: result, statusCode: 200}).status(200) } 
// })

// var port = process.env.port || 8080;
// app.listen(port, () => {
//     console.log("App listening to http://localhost:" + port)
// })