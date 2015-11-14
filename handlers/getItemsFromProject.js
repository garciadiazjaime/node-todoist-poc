'use strict';
var todoist = require('require-all')(__dirname + '/../lib/todoist');

function getItemsFromProject(request, reply) {
  const projectID = parseInt(request.params.project_id);
  console.log('projectID', projectID);
  todoist.getItemsFromProject(projectID).then(function(data) {
    console.log('data', data);
    reply({
      status: true,
      data: data
    });
  });
}

module.exports = getItemsFromProject;
