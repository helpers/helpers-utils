var expect = require('chai').expect,
    helpersUtils = require('..');

describe('helpers-utils', function() {
  it('should say hello', function(done) {
    expect(helpersUtils()).to.equal('Hello, world');
    done();
  });
});
