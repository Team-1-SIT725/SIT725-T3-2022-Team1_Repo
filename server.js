require("dotenv").config();
var express = require("express");
var app = express();
var cors = require("cors");
let Routes = require("./routes");
require("./dbConnect");

// testing
let http = require('http').createServer(app)
let io = require('socket.io')(http)

app.use(express.static(__dirname + "/public"));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api", Routes);

// testing 
// app.get('/test', function (request, response) {
//     var user_name = request.query.user_name

//     response.end("Hello " + user_name + "!")
// })
// socket test
io.on('connection', (socket) => {
    console.log('a user connected')
    socket.on('disconnect', () => {
        console.log('user disconnected')
    })

    setInterval(() => {
        socket.emit('number', parseInt(Math.random() * 10))
    }, 1000)
})

var port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("App listening to: http://localhost:" + port);
});
