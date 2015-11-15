const when = require('when');
const http = require('http');
const express = require('express');
const app = express();
const WebSocketServer = require('ws').Server;

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendfile('templates/index.html');
});

app.get('/start', function(req, res) {
  res.sendfile('templates/start.html');
});

app.get('/running', function(req, res) {
  res.sendfile('templates/running.html');
});

app.get('/success', function(req, res) {
  res.sendfile('templates/success.html');
});


var server = http.createServer(app);
server.listen(3333);


// var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({server: server});
// var wss = new WebSocketServer({ port: 3333 });

var todoist = require('require-all')(__dirname + '/lib/todoist');

var todosIDs = {};

wss.on('connection', function connection(ws) {
  console.log('new connection');

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    if (message === 'start_routine') {
      console.log('here');
      // ws.send('pebble_start_routine');

      wss.clients.forEach(function each(client) {
        client.send('pebble_start_routine');
      });


    }
  });

  ws.on('close', function close() {
    console.log('disconnected');
  });


  // emulateSign(ws);
  // var cont = 0;
  // var projectID = 155704829;
  //
  // var interval = setInterval(function() {
  //   var sendNotification = false;
  //   todoist.getItemsFromProject(projectID).then(function(data) {
  //     console.log('getItemsFromProject', data.length);
  //
  //     for (var i = 0, len = data.length; i < len; i++) {
  //       if (!todosIDs[data[i].id] && !sendNotification) {
  //         sendNotification = true;
  //       }
  //       todosIDs[data[i].id] = {
  //         status: 0
  //       };
  //     }
  //     console.log('sendNotification', sendNotification);
  //     if (sendNotification) {
  //       ws.send('true');
  //     }
  //   });
  //
  // }, 5000);

});

function emulateSign(ws) {
  setTimeout(function() {
    ws.send('start_routine');
  }, 2000);
}
