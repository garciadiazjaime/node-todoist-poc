'use strict';
var todoist = require('require-all')(__dirname + '/../lib/todoist');

function addProject(request, reply) {
  var name = request.payload.name;

  todoist.addProject(name).then(function(data) {
    reply({
      status: true,
      data: data
    });
  });
}

module.exports = addProject;
