(function () {
    'use strict';

    angular.module('MenuChoiceApp', [])
      .controller('NarrowItDownController', NarrowItDownController)
      .service('MenuSearchService', MenuSearchService)
      .directive('foundItems', foundItemsDirective)
      .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

    //Parent Controller
    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var menuCtrl = this;

        //Search input string
        menuCtrl.searchTerm = "";

        //Flag for Empty menu message
        menuCtrl.showEmptyMessage = false;

        //List of the narrowed down menu items
        menuCtrl.found = [];

        //Call to get the filtered menu items based on the input search string
        menuCtrl.getNarrowedItems = function (searchTerm) {
            if (menuCtrl.searchTerm != "") {
                //'Deffered' Promise from the  MenuSearchService
                var promise = MenuSearchService.getMatchedMenuItems(menuCtrl.searchTerm);

                promise.then(function (response) {
                    clearList();
                    menuCtrl.found = response;
                    if (menuCtrl.found.length > 0)
                        menuCtrl.showEmptyMessage = false;
                    else
                        menuCtrl.showEmptyMessage = true;
                })
                  .catch(function (error) {
                      console.log(error);
                  });
            }
            else {
                menuCtrl.showEmptyMessage = true;
                clearList();
            }
        }

        //Removing item form the list
        menuCtrl.removeItem = function (itemIndex) {
            menuCtrl.found.splice(itemIndex, 1);
        };

        //return boolean value for ng-if in directive - indicates if list is empty 
        //menuCtrl.isEmpty = function () {
        //  return menuCtrl.found.length < 1 || menuCtrl.searchTerm === "";
        //};

        var clearList = function () {
            menuCtrl.found = [];
        };

    }

    //Directive defination object function
    function foundItemsDirective() {
        var ddo = {
            templateUrl: 'foundItems.html',
            scope: {
                items: '<',
                onRemove: '&',
                emptyMessage: '@',
                showEmptyMessage: '='
            },
            controller: foundItemsDirectiveController,
            controllerAs: 'foundList',
            bindToController: true
        };

        return ddo;
    }

    //Directive Controller
    function foundItemsDirectiveController() {
        var foundList = this;
    }

    //Menu service which fetch the data from $http
    MenuSearchService.$inject = ['$http', 'ApiBasePath', '$q']
    function MenuSearchService($http, ApiBasePath, $q) {
        var service = this;

        // List of all menu items
        var menuItems = [];

        // List of narrowed down menu items to be returned
        var foundItems = [];

        service.getMatchedMenuItems = function (searchTerm) {
            var deferred = $q.defer(); // defferring the promise with $q

            var promise = getMenuItems(); // gets the $http response object

            promise.then(function (response) {
                clearItems();
                menuItems = response.data.menu_items;

                //filtering the items based on input search term
                for (var i = 0; i < menuItems.length; i++) {
                    if (menuItems[i].description.indexOf(searchTerm) > -1)
                        foundItems.push(menuItems[i]);
                }

                //wrapping directive local list into promise to be read by parent controller
                deferred.resolve(foundItems); 
            })
              .catch(function (error) {
                  deferred.reject(error);
              });

            return deferred.promise;
        }

        //clear directive's local lists
        var clearItems = function () {
            menuItems = [];
            foundItems = [];
        };

        //Calls the $http service and returns the whole response object
        var getMenuItems = function () {
            var response = $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json")
            });

            return response;
        };
    }

})();
