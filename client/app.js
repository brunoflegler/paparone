'use strict';

var myApp = angular.module('myApp', ['' +
    'ui.router',
    'ngSanitize',
    'ngAnimate',
    'ui.bootstrap',
    'ngTableToCsv',
    'ui.utils.masks',
    'toastr',
    'satellizer',
    'angularUtils.directives.dirPagination',
    'ui.utils.masks'
]);

myApp.config(function($stateProvider, $urlRouterProvider, $authProvider) {
    $stateProvider
        .state('home', {
            url: '/',
            controller: 'homeController',
            templateUrl: 'pages/home.html'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'pages/login.html',
            controller: 'loginController',
            resolve: {
                skipIfLoggedIn: skipIfLoggedIn
            }
        })
        .state('logout', {
            url: '/logout',
            template: null,
            controller: 'logoutController'
        })
        .state('profile', {
            url: '/profile',
            templateUrl: 'pages/profile.html',
            controller: 'profileController',
            resolve: {
                loginRequired: loginRequired
            }
        })
        .state('user', {
            url: '/user',
            templateUrl: 'pages/user.html',
            controller: 'userController',
            resolve: {
                loginRequired: loginRequired
            }
        }).state('product', {
            url: '/product',
            templateUrl: 'pages/product.html',
            controller: 'productController',
            resolve: {
                loginRequired: loginRequired
            }
        }).state('recipe', {
            url: '/recipe',
            templateUrl: 'pages/recipe.html',
            controller: 'recipeController',
            resolve: {
                loginRequired: loginRequired
            }
        }).state('estimate', {
            url: '/estimate',
            templateUrl: 'pages/estimate.html',
            controller: 'estimateController',
            resolve: {
                loginRequired: loginRequired
            }
        }).state('unit', {
            url: '/unit',
            templateUrl: 'pages/unit.html',
            controller: 'unitController',
            resolve: {
                loginRequired: loginRequired
            }
        });

    $urlRouterProvider.otherwise('/');
    $authProvider.loginUrl = '/paparone/auth/login';
});

function skipIfLoggedIn($q, $auth) {
    var deferred = $q.defer();
    if ($auth.isAuthenticated()) {
        deferred.reject();
    } else {
        deferred.resolve();
    }
    return deferred.promise;
}

function loginRequired($q, $location, $auth) {
    var deferred = $q.defer();
    if ($auth.isAuthenticated()) {
        deferred.resolve();
    } else {
        $location.path('/login');
    }
    return deferred.promise;
}



