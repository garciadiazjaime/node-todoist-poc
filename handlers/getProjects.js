'use strict';
var todoist = require('require-all')(__dirname + '/../lib/todoist');

function getProjects(request, reply) {
  todoist.getProjects().then(function(data) {
    reply({
      status: true,
      data: data
    });
  });
}

module.exports = getProjects;
