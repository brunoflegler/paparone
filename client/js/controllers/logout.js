myApp.controller('logoutController', function($scope, $auth, $location) {
    if (!$auth.isAuthenticated()) { return; }
    $auth.logout()
        .then(function() {
            $location.path('/login');
        });

});