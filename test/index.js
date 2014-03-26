
var inspect = require('util').inspect;
var expect = require('chai').expect;

var helpersUtils = require('..');
var utils = helpersUtils.Utils;
var library = helpersUtils.Library;

var Handlebars = require('handlebars');

describe('helpers-utils', function() {

  var greeting = function (name) {
    return 'Hello, ' + name + '!';
  };

  after(function () {
    library.helpers = [];
    delete Handlebars.helpers['greeting'];
  });

  it('should contain the correct properties', function () {
    expect(helpersUtils).to.have.property('Utils');
    expect(helpersUtils).to.have.property('Library');
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

    library.addHelper('greeting', greeting);
    expect(library.helpers).to.have.property('greeting');

  });

  it('should register a helper with handlebars', function () {

    library.addHelper('greeting', greeting);
    library.registerHelpers(Handlebars);

    expect(Handlebars.helpers).to.have.property('greeting');
  });

  it('should add a helper to the Library and return the correct results', function () {

    library.addHelper('gretting', greeting);
    expect(library.helpers.greeting('Brian')).to.eql('Hello, Brian!');

  });

  it('should register a helper with handlebars that is called in a template', function () {

    library.addHelper('greeting', greeting);
    library.registerHelpers(Handlebars);

    var data = {
      name: 'Brian'
    };

    var tmpl = '{{gretting name}} Welcome to the wonderful world of helpers!';
    expect(Handlebars.compile(tmpl)(data)).to.eql('Hello, Brian! Welcome to the wonderful world of helpers!');

  });

});
