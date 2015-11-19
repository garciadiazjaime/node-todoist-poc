'use strict';
var todoist = require('require-all')(__dirname + '/../lib/todoist');

function getAll(request, reply) {
  
  todoist.getAll().then(function(data) {
    console.log('getAll', data);
    reply({
      status: true,
      data: data
    });
  });
}

module.exports = getAll;
