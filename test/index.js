
var inspect = require('util').inspect;

var expect = require('chai').expect,
    utils = require('..');

describe('helpers-utils', function() {
  it('should extend an api', function(done) {
    var expected = {
      foo: function () { return 'bar'; },
      bar: function () {}
    };

    var spec = {
      foo: function () {},
      bar: function () {}
    };

    var actual = {
      foo: function () { return 'bar'; }
    };

    utils.expects(actual, spec);

    expect(actual).to.have.property('foo');
    expect(typeof actual.foo).to.eql('function');

    expect(actual).to.have.property('bar');
    expect(typeof actual.bar).to.eql('function');

    done();
  });
});
