(function() {
  'use strict';

  angular.module('app.resources')
    .controller('ItemsController', ItemsController);

  ItemsController.$inject = ['$mdDialog', '$state', 'Item'];

  function ItemsController($mdDialog, $state, Item) {
    var self = this;

    // Public methods
    self.add = add;
    self.view = view;
    self.remove = remove;

    refresh();

    function refresh() {
      Item.getList().then(function(items) {
        self.items = items;
      });
    }

    function add(product) {
      $mdDialog.show({
        templateUrl: 'app/store/product-dialog.html',
        controller: 'ItemDialogController as $ctrl'
      }).then(refresh);
    }

    function view(item) {
      $state.go('item', {
        id: item._id
      });
    }

    function remove(item) {
      Item.one(item._id).remove().then(refresh);
    }
  }
})();
