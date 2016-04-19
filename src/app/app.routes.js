(function() {
  'use strict';

  angular.module('app')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider
      .state('app', {
        abstract: true,
        templateUrl: 'app/layout/main.html'
      })
      .state('home', {
        url: '/',
        controller: ['$state', function($state) {
          $state.go('products');
        }]
      });
  }
})();
