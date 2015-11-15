var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var numberLoop = 1000;

app.get('/', function(req, res) {
  res.sendfile('index.html');
});

io.on('connection', function(socket) {
  console.log('a user connected');

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });

  var readFileInterval = setInterval(function() {
    fs.readFile('./data/accel.txt', 'utf8', function(err, data) {
      if (err) {
        return console.log(err);
      }
      console.log(data);
      io.emit('update_chart', { accel: data });
    });
  });

});

http.listen(8888, function() {
  console.log('listening on *:8888');
});
