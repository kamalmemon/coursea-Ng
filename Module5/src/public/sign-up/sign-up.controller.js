(function() {
"use strict";

angular.module('public')
.controller('SignupController', SignupController);

SignupController.$inject = ['MenuService','UserPreferenceService'];
function SignupController(MenuService, UserPreferenceService) {
  var $ctrl = this;

  $ctrl.status = '';
  $ctrl.error = '';
  
  $ctrl.menuNumber = '';

  /**
   * Handles when user clicks the submit button.
   */
  $ctrl.signUp = function() {    
      $ctrl.status = '';
      $ctrl.error = '';
      $ctrl.getMenuItem($ctrl.menuNumber);
  };

  $ctrl.getMenuItem = function(shortName){
     return MenuService.getMenuItem(shortName).then(function (response) {
        $ctrl.menuItem = response;
        UserPreferenceService.savePreferences(getPreferences());        
        $ctrl.status = 'Your information has been saved';      
    })
    .catch( function (response) {
        $ctrl.error = "No such menu number exists";
    })
  };

  var getPreferences = function() {
    var userPef = {};

    userPef.firstName = $ctrl.firstName;
    userPef.lastName = $ctrl.lastName;
    userPef.email = $ctrl.email;
    userPef.phoneNumber = $ctrl.phoneNumber;
    userPef.menuItem = $ctrl.menuItem;

    return userPef;
  };

}


})();
