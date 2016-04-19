(function() {
  'use strict';

  angular.module('app.security')
    .run(run);

  run.$inject = ['Resource', '$state', '$rootScope', 'auth'];

  function run(Resource, $state, $rootScope, auth) {
    Resource.addFullRequestInterceptor(function(element, operation, what, url, headers, params) {
      var token = auth.getToken();

      if (token) {
        headers.Authorization = 'Bearer ' + token;
      }

      return {
        element: element,
        params: params,
        headers: headers
      };
    });

    Resource.setErrorInterceptor(function(response) {
      if (response.status === 401) {
        auth.removeToken();
        $state.go('login', {
          message: response.data.message
        });
      }

      return true;
    });

    $rootScope.$on('$stateChangeStart', function(event, toState) {
      if (toState.name !== 'login' && !auth.getToken()) {
        $state.go('login');
        event.preventDefault();
        return false;
      }
    })
  }
})();
