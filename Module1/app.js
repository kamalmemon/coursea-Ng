(function () {
  'use strict';

  angular.module('LunchChecker', [])
    .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope) {

    $scope.checkLunchItems = function () {
      if ($scope.lunchItems) {
        //Split the input string on ',' in an array and filter out empty strings
        $scope.resultMessage = getMessage($scope.lunchItems.split(',').filter(v => v != '').length);
      }
      else
        $scope.resultMessage = "Please enter data first";

      //Get the styles based on result message
      var colorStyle = getColorStyle($scope.resultMessage)
      //Set the styles based on result message
      $scope.inputStyle = { "border-color": colorStyle };
      $scope.messageStyle = { "color": colorStyle };
    };
  }

  //Returns the message based on number of items
  function getMessage(itemCount) {
    if (itemCount <= 3)
      return "Enjoy!";
    else if (itemCount > 3)
      return "Too much!";
  }

  //Returns the style color based on message
  function getColorStyle(resultMsg) {
    switch (resultMsg) {
      case "Enjoy!": case "Too much!":
        return "green";
      case "Please enter data first":
        return "red";
      default:
        return "#ccc";
    }
  }
})();
