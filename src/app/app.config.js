(function() {
  'use strict';

  angular.module('app')
    .config(config);

  config.$inject = ['$locationProvider', 'RestangularProvider'];

  function config($locationProvider, RestangularProvider) {
    $locationProvider.html5Mode(true);
    RestangularProvider.setBaseUrl('http://localhost:4000');
  }
})();
