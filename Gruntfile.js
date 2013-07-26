/*
 * grunt-perforce
 * https://github.com/hravnx/grunt-perforce
 *
 * Copyright (c) 2013 Henrik Ravn
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/**/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    perforce: {
      options: {
        port: 'cphp4p203:1668',
        user: 'henrikr',
        workspace: 'HMA'
      },

      print_help: {
        options: {
          cmd: 'help'
        },
        files: {
          'tmp/print_help': ['test/fixtures/testing', 'test/fixtures/123'],
        },
      },


    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

    watch: {
      files: ['./**/*.js'],
      tasks: ['clean', 'perforce', 'nodeunit'],
      options: { atBegin: true }
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', 'watch');

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
