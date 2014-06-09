/**
 * Created by wsharp on 6/6/2014.
 */
var express = require('express'),
    path = require('path'),
    socket = require('./app/socket'),
    db = require('./app/database');

var port = process.env.PORT || 3000;
var app = express();

// static routing, just for now
app.use(express.static(path.join(__dirname, 'public')));

app.get('/search/:filter', function(req, res) {
    console.log('filter: ' + req.params.filter + '!');
});

// setup the server
var server = app.listen(port, function() {
    console.log('Listening on port %d', server.address().port);
});

// routes
//require('./routes/main');

// attach to socket.io
socket.Listen(server);

// connect to mongo
db.Connect();




