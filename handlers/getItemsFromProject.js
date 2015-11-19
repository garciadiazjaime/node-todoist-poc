'use strict';
var todoist = require('require-all')(__dirname + '/../lib/todoist');

function getItemsFromProject(request, reply) {
  const projectID = parseInt(request.params.project_id);

  todoist.getItemsFromProject(projectID).then(function(data) {
    console.log('getItemsFromProject', data);
    reply({
      status: true,
      data: data
    });
  });
}

module.exports = getItemsFromProject;
