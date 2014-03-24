
var inspect = require('util').inspect;

var expect = require('chai').expect,
    utils = require('..');

describe('helpers-utils', function() {

  var greeting = function (name) {
    return 'Hello, ' + name + '!';
  };

  before(function () {
    utils.Library.helpers = [];
  });

  it('should contain the correct properties', function () {
    expect(utils).to.have.property('expects');
    expect(utils).to.have.property('Library');
  });

  it('should extend an api using expects', function(done) {
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

  it('should add a helper to the Library', function () {

    utils.Library.addHelper('greeting', greeting);
    expect(utils.Library.helpers).to.have.property('greeting');

  });

  it('should register a helper with handlebars', function () {

    var Handlebars = require('handlebars');
    utils.Library.addHelper('greeting', greeting);
    utils.Library.registerHelpers(Handlebars);

    expect(Handlebars.helpers).to.have.property('greeting');
  });

});
