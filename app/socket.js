/**
 * Created by wsharp on 6/6/2014.
 */
var io;
var logModel = require("./models/LogModel");
var socket = require("./socket");

exports.Listen = function(app){
    io = require('socket.io')(app);

    // When client connects
    io.on('connect',function(){
        // Send top 100 logs to client
        var stream = logModel.Log.find().limit(100).stream();

        stream.on('data',function(doc){
            socket.SendMessage(doc);
        })
    })
};

///
// Send a message to the client
///
exports.SendMessage = function(message){
    io.sockets.emit('all', {data: message});
};