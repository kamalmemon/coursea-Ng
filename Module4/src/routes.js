(function () {
    'use strict';

    angular.module('MenuApp')
    .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {

        // Redirect to home page if no other URL matches
        $urlRouterProvider.otherwise('/');

        // *** Set up UI states ***
        $stateProvider

        // Home page
      .state('home', {
          url: '/',
          templateUrl: 'src/menuapp/templates/home.template.html'
      })

      // Categories Page
      .state('categories', {
          url: '/categories',
          templateUrl: 'src/menuapp/templates/categories.template.html',
          controller: 'CategoriesListController as catCtrl',
          resolve: {
              categoriesList: ['MenuDataService', function (MenuDataService) {
                  return MenuDataService.getAllCategories().then(function (response) {
                      return response;
                  });
              } ]
          }
      })

      // Items Page
       .state('items', {
           url: '/items/{categoryKey}',
           templateUrl: 'src/menuapp/templates/items.template.html',
           controller: 'ItemsController as itemCtrl',
           resolve: {
               items: ['$stateParams', 'MenuDataService',
            function ($stateParams, MenuDataService) {
                return MenuDataService.getItemsForCategory($stateParams.categoryKey)
                .then(function (items) {
                    return items;
                });
            } ]
           }
       })
      ;
    }

})();
