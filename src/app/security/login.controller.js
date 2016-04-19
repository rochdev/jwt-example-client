(function() {
  'use strict';

  angular.module('app.security')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['auth', '$state', '$stateParams'];

  function LoginController(auth, $state, $stateParams) {
    var self = this;

    self.message = $stateParams.message;

    // Public Methods
    self.login = login;

    function login() {
      return auth.login(self.username, self.password)
        .then(function() {
          $state.go('home');
        })
        .catch(function(e) {
          self.message = e.message;
        });
    }
  }
})();
