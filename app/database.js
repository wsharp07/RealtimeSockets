/**
 * Created by wsharp on 6/6/2014.
 */
var mongoose = require("mongoose");
var socket = require("./socketio");
var database = require("./database");
var logModel = require("./models/LogModel");

exports.Connect = function(){
    mongoose.connect('mongodb://localhost/logdb');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function callback () {
        console.log("Connected to MongoDB!");

        database.SetStream();
    });
};

exports.SetStream = function(filter,limit){
    // default to 250 record limit
    if(limit == null){
        limit = 250;
    }
    var stream = logModel.Log.find(filter).tailable().limit(limit).stream();

    stream.on('data',function(doc){
        socket.SendMessage(doc);
    });
};

