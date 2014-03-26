define("helpers-utils/library",
  ["exports"],
  function(__exports__) {
    "use strict";

    var Library = {};
    Library.helpers = {};

    Library.Config = {
      partialsPath: '',
      precompiledTemplates: true
    };

    Library.addHelper = function (name, helper) {
      return Library.helpers[name] = helper;
    };

    Library.registerHelpers = function (localHandlebars) {
      if (localHandlebars) {
        Library.Handlebars = localHandlebars;
      } else {
        if (typeof window !== 'undefined' && window !== null) {
          if (window.Ember != null) {
            Library.Handlebars = window.Ember.Handlebars;
          } else {
            Library.Handlebars = window.Handlebars;
          }
        } else if (typeof module !== 'undefined' && module !== null) {
          Library.Handlebars = require('handlebars');
        }
      }

      Library.registerHelper = function (name, helper) {
        if ((typeof window !== 'undefined' && window !== null) && window.Ember) {
          return Library.Handlebars.helper(name, helper);
        } else {
          return Library.Handlebars.registerHelper(name, helper);
        }
      };

      var results = [];
      for (var name in Library.helpers) {
        var helper = Library.helpers[name];
        results.push(Library.registerHelper(name, helper));
      }

      return results;
    };


    __exports__.Library = Library;
  });
define("helpers-utils/utils",
  ["helpers-utils/library","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Library = __dependency1__.Library;


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


    __exports__.Utils = Utils;
  });
define("helpers-utils",
  ["helpers-utils/library","helpers-utils/utils","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var Library = __dependency1__.Library;
    var Utils = __dependency2__.Utils;


    __exports__.Library = Library;
    __exports__.Utils = Utils;
  });