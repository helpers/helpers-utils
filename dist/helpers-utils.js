(function(globals) {
var define, requireModule;

(function() {
  var registry = {}, seen = {};

  define = function(name, deps, callback) {
    registry[name] = { deps: deps, callback: callback };
  };

  requireModule = function(name) {
    if (seen[name]) { return seen[name]; }
    seen[name] = {};

    var mod = registry[name];
    if (!mod) {
      throw new Error("Module '" + name + "' not found.");
    }

    var deps = mod.deps,
        callback = mod.callback,
        reified = [],
        exports;

    for (var i=0, l=deps.length; i<l; i++) {
      if (deps[i] === 'exports') {
        reified.push(exports = {});
      } else {
        reified.push(requireModule(deps[i]));
      }
    }

    var value = callback.apply(this, reified);
    return seen[name] = exports || value;
  };
})();

define("helpers-utils/dates",
  ["exports"],
  function(__exports__) {
    "use strict";
    var Dates = {};

    Dates.padNumber = function (num, count, padCharacter) {
      if (typeof padCharacter === 'undefined') {
        padCharacter = '0';
      }
      var lenDiff = count - String(num).length;
      var padding = '';
      if (lenDiff > 0) {
        while (lenDiff--) {
          padding += padCharacter;
        }
      }
      return padding + num;
    };

    Dates.dayOfYear = function (date) {
      var oneJan = new Date(date.getFullYear(), 0, 1);
      return Math.ceil((date - oneJan) / 86400000);
    };

    Dates.weekOfYear = function (date) {
      var oneJan = new Date(date.getFullYear(), 0, 1);
      return Math.ceil((((date - oneJan) / 86400000) + oneJan.getDay() + 1) / 7);
    };

    Dates.isoWeekOfYear = function (date) {
      var target = new Date(date.valueOf());
      var dayNr = (date.getDay() + 6) % 7;
      target.setDate(target.getDate() - dayNr + 3);
      var jan4 = new Date(target.getFullYear(), 0, 4);
      var dayDiff = (target - jan4) / 86400000;
      return 1 + Math.ceil(dayDiff / 7);
    };

    Dates.tweleveHour = function (date) {
      if (date.getHours() > 12) {
        return date.getHours() - 12;
      } else {
        return date.getHours();
      }
    };

    Dates.timeZoneOffset = function (date) {
      var hoursDiff = -date.getTimezoneOffset() / 60;
      var result = Dates.padNumber(Math.abs(hoursDiff), 4);
      return (hoursDiff > 0 ? '+' : '-') + result;
    };

    Dates.format = function (date, format) {
      return format.replace(Dates.formats, function (match, p) {
        switch (p) {
        case 'a':
          return Dates.abbreviatedWeekdays[date.getDay()];
        case 'A':
          return Dates.fullWeekdays[date.getDay()];
        case 'b':
          return Dates.abbreviatedMonths[date.getMonth()];
        case 'B':
          return Dates.fullMonths[date.getMonth()];
        case 'c':
          return date.toLocaleString();
        case 'C':
          return Math.round(date.getFullYear() / 100);
        case 'd':
          return Dates.padNumber(date.getDate(), 2);
        case 'D':
          return Dates.format(date, '%m/%d/%y');
        case 'e':
          return Dates.padNumber(date.getDate(), 2, ' ');
        case 'F':
          return Dates.format(date, '%Y-%m-%d');
        case 'h':
          return Dates.format(date, '%b');
        case 'H':
          return Dates.padNumber(date.getHours(), 2);
        case 'I':
          return Dates.padNumber(Dates.tweleveHour(date), 2);
        case 'j':
          return Dates.padNumber(Dates.dayOfYear(date), 3);
        case 'k':
          return Dates.padNumber(date.getHours(), 2, ' ');
        case 'l':
          return Dates.padNumber(Dates.tweleveHour(date), 2, ' ');
        case 'L':
          return Dates.padNumber(date.getMilliseconds(), 3);
        case 'm':
          return Dates.padNumber(date.getMonth() + 1, 2);
        case 'M':
          return Dates.padNumber(date.getMinutes(), 2);
        case 'n':
          return '\n';
        case 'p':
          if (date.getHours() > 11) {
            return 'PM';
          } else {
            return 'AM';
          }
        break;
        case 'P':
          return Dates.format(date, '%p').toLowerCase();
        case 'r':
          return Dates.format(date, '%I:%M:%S %p');
        case 'R':
          return Dates.format(date, '%H:%M');
        case 's':
          return date.getTime() / 1000;
        case 'S':
          return Dates.padNumber(date.getSeconds(), 2);
        case 't':
          return '\t';
        case 'T':
          return Dates.format(date, '%H:%M:%S');
        case 'u':
          if (date.getDay() === 0) {
            return 7;
          } else {
            return date.getDay();
          }
        break;
        case 'U':
          return Dates.padNumber(Dates.weekOfYear(date), 2);
        case 'v':
          return Dates.format(date, '%e-%b-%Y');
        case 'V':
          return Dates.padNumber(Dates.isoWeekOfYear(date), 2);
        case 'W':
          return Dates.padNumber(Dates.weekOfYear(date), 2);
        case 'w':
          return Dates.padNumber(date.getDay(), 2);
        case 'x':
          return date.toLocaleDateString();
        case 'X':
          return date.toLocaleTimeString();
        case 'y':
          return String(date.getFullYear()).substring(2);
        case 'Y':
          return date.getFullYear();
        case 'z':
          return Dates.timeZoneOffset(date);
        default:
          return match;
        }
      });
    };

    Dates.formats = /%(a|A|b|B|c|C|d|D|e|F|h|H|I|j|k|l|L|m|M|n|p|P|r|R|s|S|t|T|u|U|v|V|W|w|x|X|y|Y|z)/g;

    Dates.abbreviatedWeekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];

    Dates.fullWeekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    Dates.abbreviatedMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    Dates.fullMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


    __exports__.Dates = Dates;
  });
define("helpers-utils/html",
  ["exports"],
  function(__exports__) {
    "use strict";

    // The module to be exported.
    var Html = {};


    /**
     * Remove extra newlines from HTML, respect indentation
     * @param  {String} html
     * @return {String}
     */
    Html.condense = function(str) {
      return str.replace(/(\n|\r){2,}/g, '\n');
    };

    /**
     * Add a single newline above code comments in HTML
     * @param  {[type]} html
     * @return {[type]}
     */
    Html.padcomments = function(str) {
      return str.replace(/(\s*<!--)/g, '\n$1');
    };


    /**
     * Parse HTML attributes from options hash
     * @param  {[type]} hash [description]
     * @return {[type]}      [description]
     */
    Html.parseAttributes = function (hash) {
      return Object.keys(hash).map(function (key) {
        return "" + key + "=\"" + hash[key] + "\"";
      }).join(' ');
    };


    __exports__.Html = Html;
  });
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


    __exports__.Utils = Utils;
  });
define("helpers-utils",
  ["helpers-utils/library","helpers-utils/utils","helpers-utils/dates","helpers-utils/html","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __exports__) {
    "use strict";
    var Library = __dependency1__.Library;
    var Utils = __dependency2__.Utils;
    var Dates = __dependency3__.Dates;
    var Html = __dependency4__.Html;


    __exports__.Library = Library;
    __exports__.Utils = Utils;
    __exports__.Dates = Dates;
    __exports__.Html = Html;
  });
window.helpersUtils = requireModule("helpers-utils");
})(window);