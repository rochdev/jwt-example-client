(function() {
  'use strict';

  angular.module('app.security')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        controller: 'LoginController as $ctrl',
        templateUrl: 'app/security/login.html',
        params: {
          message: ''
        }
      });
  }
})();
