var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    images = [];

server.listen(process.env.PORT || 3000);

app.use("/", express.static(__dirname + "/public"));

io.sockets.on('connection', function(socket) {
  socket.on('add buuur', function(data) {
    images.unshift(data.img);
    images = images.slice(0, 4);
    io.sockets.emit('buuur added', { img: data.img });
  });
});

app.get('/images', function(req, res) {
  res.json(images);
});

app.get('/clear', function(req, res) {
  images = [];
  res.json(images);
  io.sockets.emit('buuur cleared', {});
});
