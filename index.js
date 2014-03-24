
(function () {
  // if module exists, we're using node so export something
  if (typeof module !== 'undefined' && module !== null) {
    module.exports = helperUtils = {};
    // include the other modules here
    helperUtils.Library = require('./src/library');
    var utils = require('./src/utils');
    for (var k in utils) {
      if (utils.hasOwnProperty(k)) {
        helperUtils[k] = utils[k];
      }
    }

  } else {
    // otherwise we're problably in a browser so use
    // 'this' which is the window object
    this.helperUtils = {};
    // the other modules will get appended later
  }

}());
