myApp.controller('navbarController', function($scope, $auth) {


    $scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
    };
});