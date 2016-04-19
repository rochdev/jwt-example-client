(function() {
  'use strict';

  angular.module('app.resources')
    .factory('Product', ProductFactory);

  ProductFactory.$inject = ['Resource'];

  function ProductFactory(Resource) {
    return Resource.service('products');
  }
})();
