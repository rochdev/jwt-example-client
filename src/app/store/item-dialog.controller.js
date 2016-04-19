(function(module) {
  'use strict';

  module.controller('ItemDialogController', ItemDialogController);

  ItemDialogController.$inject = ['$mdDialog', 'Item'];

  function ItemDialogController($mdDialog, Item) {
    var self = this;

    // Public methods
    self.save = save;
    self.cancel = cancel;

    function save() {
      Item.post({
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
