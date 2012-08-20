var express = require('express');
var app = express()
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);

//for dev debug
app.configure('development', function() {
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
});

app.use("/core", express.static(__dirname + '/core'));
app.use("/extensions/goto", express.static(__dirname + '/extensions/goto'));
app.use("/extensions/menu", express.static(__dirname + '/extensions/menu'));
app.use("/extensions/navigation", express.static(__dirname + '/extensions/navigation'));
app.use("/extensions/status", express.static(__dirname + '/extensions/status'));
app.use("/extensions/hash", express.static(__dirname + '/extensions/hash'));
app.use("/extensions/scale", express.static(__dirname + '/extensions/scale'));
app.use("/themes/style", express.static(__dirname + '/themes/style'));
app.use("/themes/transition", express.static(__dirname + '/themes/transition'));
app.use("/modernizr", express.static(__dirname + '/modernizr'));

server.listen(8080);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.get('/next', function (req, res) {
  io.sockets.emit('page', {action : 'next'});
  res.send('');
});

app.get('/previous', function (req, res) {
  io.sockets.emit('page', {action : 'prev'});
  res.send('');
});

io.sockets.on('connection', function (socket) {
});




