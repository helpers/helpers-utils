
(function () {

  var expects = function(config, spec) {
    for(var k in spec) {
      if (typeof config[k] === 'undefined') {
        config[k] = spec[k];
      }
    }
  };

  if (typeof module !== 'undefined' && module !== null) {
    module.exports = expects;
  } else {
    this.helperUtils.expects = expects;
  }

})();
