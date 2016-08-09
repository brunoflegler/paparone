myApp.factory('Account', function($http, URL) {
    return {
      getProfile: function() {
          return $http.get(URL.base + 'api/me');
      },
      updateProfile: function(profileData) {
        return $http.put(URL.base +'api/me', profileData);
      }
    };
  });