var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var getAll = require('../../lib/todoist/getAll');
var expect = chai.expect;

describe('getAll', function(){

  it('should return a all data from todoist user ', function(done){
    getAll().then(function(data){
      expect(data).to.be.an('object');
      expect(data.Items).to.be.an('array');
      expect(data.Projects).to.be.an('array');
      done();
    })
  });
});
