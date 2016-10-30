(function() {
"use strict";

angular.module('common', [])
.constant('ApiPath', 'http://kmemon-cr-ng.herokuapp.com')
.config(config);

config.$inject = ['$httpProvider'];
function config($httpProvider) {
  $httpProvider.interceptors.push('loadingHttpInterceptor');
}

})();
