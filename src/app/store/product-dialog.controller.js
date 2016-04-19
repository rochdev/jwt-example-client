(function(module) {
  'use strict';

  module.controller('ProductDialogController', ProductDialogController);

  ProductDialogController.$inject = ['$mdDialog', 'Product'];

  function ProductDialogController($mdDialog, Product) {
    var self = this;

    // Public methods
    self.save = save;
    self.cancel = cancel;

    function save() {
      Product.post({
        name: self.name,
        description: self.description
      }).then(function() {
        $mdDialog.hide();
      });
    }

    function cancel() {
      $mdDialog.cancel();
    }
  }
})(angular.module('app.store'));
