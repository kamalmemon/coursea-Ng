(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    var config = {};
    if (category) {
      config.params = {'category': category};
    }

    return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
      return response.data;
    });
  };

  
  service.getMenuItem = function (shortName) {  
    var config = {headers:  {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST',
        "Access-Control-Allow-Headers" : "X-Requested-With"
    }
};
    return $http.get(ApiPath + '/menu_items/' + shortName + '.json', config).then(function (response) {
      return response.data;
    });
   /* .catch( function (response) {
        console.log("number not found");
        return response.data;
    });*/
  };

}



})();
