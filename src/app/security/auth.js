(function(module) {
  'use strict';

  module.factory('auth', authFactory);

  authFactory.$inject = ['$q', 'Restangular'];

  function authFactory($q, Restangular) {
    function Auth() {
      var self = this;

      // Public methods
      self.login = login;
      self.logout = logout;
      self.getToken = getToken;
      self.removeToken = removeToken;

      function login(username, password) {
        return Restangular.all('login').post({
          username: username,
          password: password
        }).then(function(response) {
          localStorage.setItem('token', response.token);
        }, function(e) {
          return $q.reject(e.data);
        });
      }

      function logout() {
        self.removeToken();
        return $q.when();
      }

      function getToken() {
        return localStorage.getItem('token');
      }

      function removeToken() {
        return localStorage.removeItem('token');
      }
    }

    return new Auth();
  }
})(angular.module('app.security'));
