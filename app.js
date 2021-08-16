var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

io.on("connection", (socket) => {
    console.log("User Connected");

    socket.on("disconnect", () => {
        console.log("User Disconnect");
    });

    socket.on("chat message", (msg) =>{
        console.log("msg", msg);
        socket.broadcast.emit("chat message", msg)
    });
});

module.exports = {app:app, server:server};

