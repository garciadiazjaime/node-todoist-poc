

var todoist = require('require-all')(__dirname + '/lib/todoist');


// todoist.getAll().then(function(response) {
//   console.log('getAll response', response);
// });

// todoist.addProject('cool 2').then(function(response) {
//   console.log('addProject response', response);
// });

// todoist.getProjects().then(function(response) {
//   console.log('getProjects response', response);
// });

// todoist.getItems().then(function(response) {
//   console.log('getItems response', response);
// });

// // project 5 155704829
// todoist.getItemsFromProject(155704829).then(function(response) {
//   console.log('getItemsFromProject response', response);
// });

// todoist.addItemToProject(155704829, 'lets to this again')
//   .then(function(response) {
//     console.log('addItemToProject response', response);
//   });

// 6836684 "lets do this again" from proj5
// todoist.completeItemsFromProject(155704829, [6836684]).then(function(response) {
//   console.log('response', response);
// });


var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ port: 3000 });

var todoistRoutes = require('./routes/todoistRoutes');

server.route(todoistRoutes);

server.start(function() {
    console.log('Server running at:', server.info.uri);
});
