(function () {
  "use strict";

  angular.module('public')
    .controller('MyinfoController', MyinfoController);

  MyinfoController.$inject = ['UserPreferenceService'];
  function MyinfoController(UserPreferenceService) {
    var $ctrl = this;

    var userPrefs = UserPreferenceService.getPreferences();

    if (userPrefs !== null) {
      $ctrl.firstName = userPrefs.firstName;
      $ctrl.lastName = userPrefs.lastName;
      $ctrl.email = userPrefs.email;
      $ctrl.phoneNumber = userPrefs.phoneNumber;
      $ctrl.menuItem = userPrefs.menuItem;

      $ctrl.isRegistered = true;
    }
    else {
      $ctrl.isRegistered = false;
    }

  }


})();
