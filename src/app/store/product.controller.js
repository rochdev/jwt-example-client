(function(module) {
  'use strict';

  module.controller('ProductController', ProductController);

  ProductController.$inject = ['$stateParams', 'Product'];

  function ProductController($stateParams, Product) {
    var self = this;

    refresh();

    function refresh() {
      Product.one($stateParams.id).get().then(function(product) {
        self.product = product;
      });
    }
  }
})(angular.module('app.store'));
