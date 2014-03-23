
var utils = module.exports = {};

utils.expects = function(config, spec) {
  for(var k in spec) {
    if (typeof config[k] === 'undefined') {
      config[k] = spec[k];
    }
  }
};
