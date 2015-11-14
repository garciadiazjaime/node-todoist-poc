'use strict';
var todoist = require('require-all')(__dirname + '/../lib/todoist');

function getItems(request, reply) {
  todoist.getItems().then(function(data) {
    reply({
      status: true,
      data: data
    });
  });
}

module.exports = getItems;
