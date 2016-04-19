'use strict';

module.exports = function(config) {
  config.set({
    frameworks: ['mocha'],

    files: [
      'node_modules/chai/chai.js',
      'node_modules/chai-as-promised/lib/chai-as-promised.js',
      'node_modules/sinon/pkg/sinon.js',
      'node_modules/sinon-chai/lib/sinon-chai.js',
      'www/lib/lodash/dist/lodash.js',
      'www/lib/angular/angular.js',
      'www/lib/angular-animate/angular-animate.js',
      'www/lib/angular-aria/angular-aria.js',
      'www/lib/angular-messages/angular-messages.js',
      'www/lib/angular-material/angular-material.js',
      'www/lib/angular-jwt/dist/angular-jwt.js',
      'www/lib/angular-ui-router/release/angular-ui-router.js',
      'www/lib/angular-mocks/angular-mocks.js',
      'www/lib/angular-jwt/dist/angular-jwt.js',
      'www/lib/restangular/dist/restangular.js',
      'test/bootstrap.js',
      'src/app/**/*.module.js',
      'src/app/**/*.js'
    ],

    reporters: ['mocha'],

    mochaReporter: {
      output: 'minimal'
    },

    autoWatch: true,

    browsers: ['PhantomJS']
  });
};
