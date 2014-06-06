/**
 * Created by wsharp on 6/6/2014.
 */
var mongoose = require("mongoose");
var socket = require("./socketio");
var logModel = require("./models/LogModel");

function LoadAllLogs(err, logs){
    if(err != 'null'){
        logs.forEach(function(log){
            socket.SendMessage(log);
        })
    }
    else{
        console.log(err);
    }
}

exports.Connect = function(){
    mongoose.connect('mongodb://localhost/logdb');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function callback () {
        console.log("Connected to MongoDB!");

        var stream = logModel.Log.find().tailable().stream();

        stream.on('data',function(doc){
            socket.SendMessage(doc);
        });
    });
};

