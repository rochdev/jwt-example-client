(function() {
  'use strict';

  angular.module('app.resources')
    .factory('Item', ItemFactory);

  ItemFactory.$inject = ['Resource'];

  function ItemFactory(Resource) {
    return Resource.service('items');
  }
})();
