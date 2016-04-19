(function() {
  'use strict';

  angular.module('app.store')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider
      .state('products', {
        url: '/products',
        parent: 'app',
        controller: 'ProductsController as $ctrl',
        templateUrl: 'app/store/products.html'
      })
      .state('product', {
        url: '/products/:id',
        parent: 'app',
        controller: 'ProductController as $ctrl',
        templateUrl: 'app/store/product.html'
      })
      .state('items', {
        url: '/items',
        parent: 'app',
        controller: 'ItemsController as $ctrl',
        templateUrl: 'app/store/items.html'
      })
      .state('item', {
        url: '/items/:id',
        parent: 'app',
        controller: 'ItemController as $ctrl',
        templateUrl: 'app/store/item.html'
      });
  }
})();
