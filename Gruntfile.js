
module.exports = function (grunt) {

  // load the default tasks from the microlib
  var appConfig = require('grunt-microlib').init.bind(this)(grunt);
  grunt.loadNpmTasks('grunt-microlib');

  // create our local config file
  var config = {
    cfg: {
      name: 'helpers-utils.js',
      barename: 'helpers-utils',
      namespace: 'helpersUtils'
    },
    env: process.env,
    pkg: grunt.file.readJSON('package.json')
  };

  // merge the config files
  grunt.initConfig(grunt.util._.merge(appConfig, config));

  grunt.registerTask('default', ['buildNoVersion']);
  grunt.registerTask('test', ['default', 'tests']);

};
