(function(module) {
  'use strict';

  module.controller('ItemController', ItemController);

  ItemController.$inject = ['$stateParams', 'Item'];

  function ItemController($stateParams, Item) {
    var self = this;

    refresh();

    function refresh() {
      Item.one($stateParams.id).get().then(function(item) {
        self.item = item;
      });
    }
  }
})(angular.module('app.store'));
