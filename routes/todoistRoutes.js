const pathBase = '/api/todoist';
const handlersFolder = '../handlers/';

const getAll = require(handlersFolder + 'getAll');
const addProject = require(handlersFolder + 'addProject');
const getProjects = require(handlersFolder + 'getProjects');
const getItems = require(handlersFolder + 'getItems');
const getItemsFromProject = require(handlersFolder + 'getItemsFromProject');

const routes = [
  {
    method: 'GET',
    path: pathBase,
    handler: getAll
  },
  {
    method: 'GET',
    path: pathBase + '/projects',
    handler: getProjects
  },
  {
    method: 'GET',
    path: pathBase + '/items',
    handler: getItems
  },
  {
    method: 'POST',
    path: pathBase + '/project',
    handler: addProject
  },
  {
    method: 'GET',
    path: pathBase + '/project/{project_id}/items',
    handler: getItemsFromProject
  },
];

module.exports = routes;
