var handlerFactory = require('./handler');
var fs = require('fs');
var sys = require('sys');
var mime = require('mime');
var parser = require('url');
var handlers = {};

exports.clear = function() {
    handlers = {};
};

exports.register = function(url, method) {
    handlers[url] = handlerFactory.createHandler(method);
};

exports.route = function(req) {
    url = parser.parse(req.url, true);
    var handler = handlers[url.pathname];
    if (!handler) handler = this.missing(req);
    return handler;
};

exports.missing = function(req) {
    // Try to read the file locally, this is a security hole, yo /../../etc/passwd
    var url = parser.parse(req.url, true);
    var path = __dirname + "/public" + url.pathname;
    try {
        data = fs.readFileSync(path);
        return handlerFactory.createHandler(function(req, res) {
            res.writeHead(200, {'Content-Type': mime.lookup(req.url)});
            res.write(data);
            res.end();
        });
    } catch (e) {
        return handlerFactory.createHandler(function(req, res) {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.write("No route registered for " + url.pathname);
            res.end();
        });
    }
};