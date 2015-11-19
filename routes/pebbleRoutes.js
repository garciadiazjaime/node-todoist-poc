const pathBase = '/api/pebble';
var fs = require('fs');

const routes = [
  {
    method: 'GET',
    path: pathBase + '/accel',
    handler: function(request, reply) {
      var data = request.query.data;
      var obj = JSON.parse(eval(data));
      console.log(obj.x, obj.y, obj.z);
      var fileContent = [obj.x, obj.y, obj.z].join(';');
      fs.writeFile('./data/accel.txt', fileContent);
      reply(true).code(201);
    }
  }
];

module.exports = routes;
