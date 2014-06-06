/**
 * Created by wsharp on 6/6/2014.
 */
var mongoose = require("mongoose");
var logSchema = mongoose.Schema({
    Facility: String,
    Machine: String,
    Date: Date,
    Name: String,
    Message: String
}, {collection: 'log'});

exports.Log = mongoose.model('Log', logSchema);