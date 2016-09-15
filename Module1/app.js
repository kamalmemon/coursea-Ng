(function () {
  'use strict';

  angular.module('LunchChecker', [])
    .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope) {
    $scope.checkLunchItems = function () {
      if ($scope.lunchItems) {
        //split the input string on ',' in an array and filter out empty strings
        //var itemsArray = $scope.lunchItems.split(',').filter(v=>v!=''); 
        $scope.resultMessage = getMessage($scope.lunchItems.split(',').filter(v=>v!='').length);
      }
      else
        $scope.resultMessage = "Please enter data first";
    };
  }

// Returns the message based on number of items
  function getMessage(itemCount) {
    if (itemCount <= 3)
      return "Enjoy!";
    else if (itemCount > 3)
      return "Too much!";
  }
})();
