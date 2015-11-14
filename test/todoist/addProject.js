var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var addProject = require('../../lib/todoist/addProject');
var expect = chai.expect;

describe('addProject', function() {

  it('should add a project', function(done) {
    addProject('Test Project').then(function(data) {
      expect(data).to.be.an('object');
      expect(data.seq_no_global).to.be.an('number');
      expect(data.seq_no).to.be.an('number');
      expect(data.UserId).to.be.an('number');
      expect(data.SyncStatus).to.be.an('object');
      done();
    });
  });
});
