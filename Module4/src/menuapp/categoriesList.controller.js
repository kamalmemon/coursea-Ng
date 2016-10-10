(function () {
'use strict';

angular.module('MenuApp')
.controller('CategoriesListController', CategoriesListController);

CategoriesListController.$inject = ['categoriesList'];
function CategoriesListController(categoriesList) {
    var catCtrl = this;
    catCtrl.categoriesList = categoriesList;
}

})();
