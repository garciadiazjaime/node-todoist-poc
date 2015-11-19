const when = require('when');
const http = require('http');
const express = require('express');
const app = express();
const WebSocketServer = require('ws').Server;
var todoist = require('require-all')(__dirname + '/lib/todoist');
var projectID = 155704829;

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
  todoist.getItemsFromProject(projectID).then(function(response) {
    var itemsIDs = response.map(function(item) {
      return item.id;
    });
    todoist.completeItemsFromProject(projectID, itemsIDs)
      .then(function(response) {
        console.log('items completes', response);
      });
    console.log('getItemsFromProject itemsIDs', itemsIDs);
  });
  res.sendfile('templates/success.html');
});

app.get('/setup_project', function(req, res) {
  var items = ['4::Squats', '3::Abdominals', '4::Pushups'];
  items.map(function(item) {
    todoist.addItemToProject(projectID, item)
      .then(function(response) {
        console.log('addItemToProject response', response);
      });
  });
  res.send('tijuana makes me happy');
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
      wss.clients.forEach(function each(client) {
        client.send('pebble_start_routine');
      });
    }
    else if (message === 'pebble_exercise_start') {
      console.log('pebble_exercise_start');
      wss.clients.forEach(function each(client) {
        client.send('exercise_start');
      });
    }
    else if (message === 'pebble_exercise_complete') {
      console.log('exercise_complete');
      wss.clients.forEach(function each(client) {
        client.send('exercise_complete');
      });
    }
    else if (message === 'pebble_exercise_finish') {
      console.log('pebble_exercise_finish');
      wss.clients.forEach(function each(client) {
        client.send('exercise_finish');
      });
    }
    else if (message === 'pebble_exercise_bits') {
      console.log('pebble_exercise_bits');
      wss.clients.forEach(function each(client) {
        client.send('exercise_bits');
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
