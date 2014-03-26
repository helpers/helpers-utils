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


exports.Library = Library;