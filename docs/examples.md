## expects

Ensure that the expected API methods exist on an object.

```js
var utils = require('helpers-utils');

var spec = {
  context: function() { return {}; },
  registerHelpers: function() { }
};

module.exports = function (config) {
  utils.expects(config, spec);

  Library.addHelper('greeting', function (userid) {
    var context = config.context();
    var name = context[userid] || 'Guest';
    return 'Hello ' + name;
  });
};
```
