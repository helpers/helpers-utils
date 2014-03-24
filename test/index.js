
var inspect = require('util').inspect;

var expect = require('chai').expect;
var utils = require('..');
var Handlebars = require('handlebars');

describe('helpers-utils', function() {

  var greeting = function (name) {
    return 'Hello, ' + name + '!';
  };

  after(function () {
    utils.Library.helpers = [];
    delete Handlebars.helpers['greeting'];
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

    utils.Library.addHelper('greeting', greeting);
    utils.Library.registerHelpers(Handlebars);

    expect(Handlebars.helpers).to.have.property('greeting');
  });

  it('should add a helper to the Library and return the correct results', function () {

    utils.Library.addHelper('gretting', greeting);
    expect(utils.Library.helpers.greeting('Brian')).to.eql('Hello, Brian!');

  });

  it('should register a helper with handlebars that is called in a template', function () {

    utils.Library.addHelper('greeting', greeting);
    utils.Library.registerHelpers(Handlebars);

    var data = {
      name: 'Brian'
    };

    var tmpl = '{{gretting name}} Welcome to the wonderful world of helpers!';
    expect(Handlebars.compile(tmpl)(data)).to.eql('Hello, Brian! Welcome to the wonderful world of helpers!');

  });

});
