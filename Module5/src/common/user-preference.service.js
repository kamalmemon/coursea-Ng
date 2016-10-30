(function() {
"use strict";

angular.module('common')
.service('UserPreferenceService', UserPreferenceService);

/**
 * Used to store and track information about user pereferences.
 **/
function UserPreferenceService() {
  var service = this;
  var _userPref = null;

  service.savePreferences = function(userPref) {
    _userPref = userPref;
  };
  
  service.getPreferences = function() {
    return _userPref;
  };
}

})();
