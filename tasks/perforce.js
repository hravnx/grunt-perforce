/*
 * grunt-perforce
 * https://github.com/hravnx/grunt-perforce
 *
 * Copyright (c) 2013 Henrik Ravn
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var p4 = require('./lib/p4wrapper')();

  grunt.registerMultiTask('perforce', 'Performs various Perforce tasks', function() {

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      port: '',
      user: '',
    });

    console.log(options.test);

    if(options.cmd === null) {
      grunt.log.error('no cmd found in options');
    }

    var done = this.async();

    if(typeof options.cmd === "undefined") {
      grunt.log.error('no "cmd" field found in options');
      done(false);
      return;
    }

    var stuff = p4.run(options, function(error, stdout, stderr) {
      if(error !== null) {
        grunt.log.notverbose.error(error);

        if(stdout) {
          grunt.verbose.ok(stdout);
        }

        if(stderr) {
          grunt.verbose.error(stderr);
        }

        done(false);
      } else { 
        // TODO : call into supplied function to process success output
        done(true);
      }
    });

  });

};
