
import { Library } from "./library";

var Utils = {};

Utils.expects = function(config, spec) {
  for(var k in spec) {
    if (typeof config[k] === 'undefined') {
      config[k] = spec[k];
    }
  }
};

Utils.isHandlebarsSpecific = function (value) {
  return (value && (value.fn != null)) || (value && (value.hash != null));
};

Utils.isUndefined = function (value) {
  return (value === void 0 || value === null) || Utils.isHandlebarsSpecific(value);
};

Utils.safeString = function (str) {
  return new Library.Handlebars.SafeString(str);
};

Utils.trim = function (str) {
  var re = /^[\s\xA0]+|[\s\xA0]+$/g;
  var trim = /\S/.test("\xA0") ? re : /^\s+|\s+$/g;
  return str.toString().replace(trim, '');
};

Utils.isFunc = function (value) {
  return typeof value === 'function';
};

Utils.isString = function (value) {
  return typeof value === 'string';
};

Utils.result = function (value) {
  if (Utils.isFunc(value)) {
    return value();
  } else {
    return value;
  }
};

Utils.err = function (msg) {
  return new Error(msg);
};


Utils._indexOf = [].indexOf || function (item) {
  for (var i = 0, l = this.length; i < l; i++) {
    if (i in this && this[i] === item) {return i;}
  }
  return -1;
};

Utils.compare = function(val) {
  val = val || function (a, b) {
    if (a.index >= b.index) {
      return 1;
    } else {
      return -1;
    }
  };
};


Utils.eachProperty = function(context, options) {
  var ret = "";
  for (var prop in context) {
    ret = ret + options.fn({
      property: prop,
      value: context[prop]
    });
  }
  return ret;
};

export { Utils };
