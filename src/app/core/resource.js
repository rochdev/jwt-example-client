(function() {
  'use strict';

  angular.module('app.core')
    .factory('Resource', ResourceFactory);

  ResourceFactory.$inject = ['Restangular'];

  function ResourceFactory(Restangular) {
    return Restangular.withConfig(function() {});
  }
})();
