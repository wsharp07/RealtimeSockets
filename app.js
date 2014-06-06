/**
 * Created by wsharp on 6/6/2014.
 */
var server = require("./server");
var router = require("./router");

// Handle your routes here, put static pages in ./public and they will server
router.register('/backdoor', function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('You found the backdoor muthafucka');
    res.end();
});

// Handle your routes here, put static pages in ./public and they will server
router.register('/', function(req, res) {
    server.getFile(req,res);
});

server.start();