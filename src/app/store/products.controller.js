(function() {
  'use strict';

  angular.module('app.resources')
    .controller('ProductsController', ProductsController);

  ProductsController.$inject = ['$mdDialog', '$state', 'Product'];

  function ProductsController($mdDialog, $state, Product) {
    var self = this;

    // Public methods
    self.add = add;
    self.view = view;
    self.remove = remove;

    refresh();

    function refresh() {
      Product.getList().then(function(products) {
        self.products = products;
      });
    }

    function add(product) {
      $mdDialog.show({
        templateUrl: 'app/store/product-dialog.html',
        controller: 'ProductDialogController as $ctrl'
      }).then(refresh);
    }

    function view(product) {
      $state.go('product', {
        id: product._id
      });
    }

    function remove(product) {
      Product.one(product._id).remove().then(refresh);
    }
  }
})();
