
(function () {

  if (typeof module !== 'undefined' && module !== null) {
    var Library = require('./library');
  }

  var utils = {};

  utils.expects = function(config, spec) {
    for(var k in spec) {
      if (typeof config[k] === 'undefined') {
        config[k] = spec[k];
      }
    }
  };

  utils.isHandlebarsSpecific = function (value) {
    return (value && (value.fn != null)) || (value && (value.hash != null));
  };

  utils.isUndefined = function (value) {
    return (value === void 0 || value === null) || utils.isHandlebarsSpecific(value);
  };

  utils.safeString = function (str) {
    return new Library.Handlebars.SafeString(str);
  };

  utils.trim = function (str) {
    var re = /^[\s\xA0]+|[\s\xA0]+$/g;
    var trim = /\S/.test("\xA0") ? re : /^\s+|\s+$/g;
    return str.toString().replace(trim, '');
  };

  utils.isFunc = function (value) {
    return typeof value === 'function';
  };

  utils.isString = function (value) {
    return typeof value === 'string';
  };

  utils.result = function (value) {
    if (utils.isFunc(value)) {
      return value();
    } else {
      return value;
    }
  };

  utils.err = function (msg) {
    return new Error(msg);
  };

  // if this is a node module, just export all the utils
  if (typeof module !== 'undefined' && module !== null) {
    module.exports = utils;
  } else {
    // if this is in a web browser
    // add each util to the 'helperUtils' object
    for (var k in utils) {
      if (utils.hasOwnProperty(k)) {
        this.helperUtils[k] = utils[k];
      }
    }
  }

})();
