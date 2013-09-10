/*jshint node: true */
module.exports = function (grunt) {

  'use strict';

  // Project configuration.
  grunt.initConfig({
    vars: {
      js_files_dir: 'src/',
      js_tests_dir: 'tests/',
    },
    jshint: {
      all: {
        src: [
          '<%= vars.js_files_dir %>*.js',
          '<%= vars.js_tests_dir %>*.js',
        ],
        options: {
          jshintrc: '.jshintrc',
        },
      }
    },
    qunit: {
      options: {
        coverage: {
          src: [
            '<%= vars.js_files_dir %>*.js',
            '<%= vars.js_tests_dir %>*.js',
          ],
          instrumentedFiles: 'temp/',
          htmlReport: 'coverage',
          lcovReport: 'coverage',
          linesThresholdPct: 100,
          statementsThresholdPct: 100,
          functionsThresholdPct: 100,
          branchesThresholdPct: 100,
        },
      },
      all: ['<%= vars.js_tests_dir %>*.html'],
    },
  });

  grunt.loadNpmTasks('grunt-qunit-istanbul');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('test', ['qunit']);
  grunt.registerTask('default', ['test', 'jshint']);

};
