const clientREST = require('./clientREST');
const when = require('when');
const _ = require('lodash');
const crypto = require('crypto');

function todoistHandler() {

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

  return {
    getAll: function() {
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
    },
    getProjects: function() {
      var params = getParams({
        seq_no: 0,
        resource_types: '["all"]'
      });
      var conf = getConf({
        params: params
      });

      return when.promise(function(resolve, reject, notify) {
        todoistHandler().getAll().then(function(response) {
          resolve(processData(response.Projects));
        });
      });
    },
    addProject: function(name) {
      var uuid = crypto.randomBytes(10).toString('hex');
      var temp_id = crypto.randomBytes(10).toString('hex');
      var commands = [{
        type: 'project_add',
        uuid: uuid,
        temp_id: temp_id,
        args: {
          name: name
        }
      }];
      var params = getParams({
        commands: JSON.stringify(commands)
      });
      var conf = getConf({
        params: params
      });
      return when.promise(function(resolve, reject, notify) {
        clientREST(conf).then(function(response) {
          resolve(processData(response.entity));
        });
      });
    },
    getItems: function() {
      var params = getParams({
        seq_no: 0,
        resource_types: '["all"]'
      });
      var conf = getConf({
        params: params
      });

      return when.promise(function(resolve, reject, notify) {
        todoistHandler().getAll().then(function(response) {
          resolve(processData(response.Items));
        });
      });
    },
    getItemsFromProject: function(projectID) {
      var params = getParams({
        seq_no: 0,
        resource_types: '["all"]'
      });
      var conf = getConf({
        params: params
      });

      return when.promise(function(resolve, reject, notify) {
        todoistHandler().getAll().then(function(response) {
          var filter = _.filter(processData(response.Items), {
            project_id: projectID
          });
          resolve(filter);
        });
      });
    },
    addItemToProject: function(projectID, item) {
      var uuid = crypto.randomBytes(10).toString('hex');
      var temp_id = crypto.randomBytes(10).toString('hex');
      var commands = [{
        type: 'item_add',
        uuid: uuid,
        temp_id: temp_id,
        args: {
          content: item,
          project_id: projectID
        }
      }];
      var params = getParams({
        commands: JSON.stringify(commands)
      });
      var conf = getConf({
        params: params
      });
      return when.promise(function(resolve, reject, notify) {
        clientREST(conf).then(function(response) {
          resolve(processData(response.entity));
        });
      });
    },
    completeItemsFromProject: function(projectID, itemIDs) {
      var uuid = crypto.randomBytes(10).toString('hex');
      var temp_id = crypto.randomBytes(10).toString('hex');
      var commands = [{
        type: 'item_complete',
        uuid: uuid,
        temp_id: temp_id,
        args: {
          ids: itemIDs,
          project_id: projectID
        }
      }];
      var params = getParams({
        commands: JSON.stringify(commands)
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
  };
}

module.exports = todoistHandler;
