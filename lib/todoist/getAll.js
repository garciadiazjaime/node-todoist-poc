const clientREST = require('../clientREST');
const when = require('when');
const _ = require('lodash');
const crypto = require('crypto');

function getAll() {

  const URL_API = 'https://todoist.com/API/v6/sync';
  const token = process.env.TODOIST_TOKEN;
  const method = 'POST';
  const headers = {};
  const paramsBase = {
    token: token
  };
  const confBase = {
    path: URL_API,
    headers: headers,
    method: method
  };

  var processData = function(data) {
    return data;
  };

  var getParams = function(data) {
    return _.merge({}, paramsBase, data);
  };

  var getConf = function(data) {
    return _.merge({}, confBase, data);
  };


  var params = getParams({
    seq_no: 0,
    resource_types: '["all"]'
  });
  var conf = getConf({
    params: params
  });

  return when.promise(function(resolve, reject, notify) {
    clientREST(conf).then(function(response) {
      resolve(processData(response.entity));
    });
  });
}

module.exports = getAll;
