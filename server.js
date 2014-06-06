/**
 * Created by wsharp on 6/6/2014.
 */
var http = require("http"),
    path = require("path"),
    mime = require('mime'),
    fs = require("fs"),
    server = require("./server"),
    router = require("./router");


exports.writeHeader = function (response,pathName){
    response.writeHead(200, {"Content-Type": mime.lookup(pathName) });
};

//helper function handles file verification
exports.getFile = function (req,res,page404){
    var
        fileName = req.url,
        localFolder = __dirname + '/public/',
        page404 = localFolder + '404.html';


    if(fileName == '/'){fileName = 'index.html'}
    var filePath = (localFolder + fileName);
    console.log("File Path: " + filePath);
    //does the requested file exist?
    fs.exists(filePath,function(exists){
        //if it does...
        if(exists){
            //read the file, run the anonymous function
            fs.readFile(filePath,function(err,contents){
                if(!err){
                    server.writeHeader(res,filePath);
                    res.end(contents);
                } else {
                    //for our own troubleshooting
                    console.dir(err);
                };
            });
        } else {
            //if the requested file was not found
            //serve-up our custom 404 page
            fs.readFile(page404,function(err,contents){
                //if there was no error
                if(!err){
                    //send the contents with a 404/not found header
                    res.writeHead(404, {'Content-Type': 'text/html'});
                    res.end(contents);
                } else {
                    //for our own troubleshooting
                    console.dir(err);
                };
            });
        };
    });
};

function start() {

    function requestHandler(request, response) {
       /* var
            fileName = request.url,
            localFolder = __dirname + '/public/',
            page404 = localFolder + '404.html';

        if(fileName == '/'){fileName = 'index.html'}
        server.getFile((localFolder + fileName),response,page404);*/

        handler = router.route(request);
        handler.process(request,response);
    }
    var app = http.createServer(requestHandler).listen(3000);
    var io = require('socket.io')(app);

    io.on('connection', function (socket) {
        socket.emit('all', { message: 'Established Socket.IO connection.' });
    });
    console.log("Server has started on port 3000.");
}

exports.start = start;
