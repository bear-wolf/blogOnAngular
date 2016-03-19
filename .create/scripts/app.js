'use strict';


//var resouce = require('./angular-resource');
//'', 'ngResource', 'appControllers'

angular.module('appSite',['ngRoute', 'ngResource', 'globalModule', 'adminModule', 'servicesModule'])
    .config([ '$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider, $location, $httpProvider) {
        console.log("Configuration appSite");
        $routeProvider
          .when('/', { templateUrl: './partials/main.html',controller: 'AdminCtrl'})
          .when('/login', { templateUrl: './partials/login.html', controller: 'AdminCtrl'})
          .when('/albums', { templateUrl: './partials/entity.html', controller: 'entityCtrl', access: { requiredAuthentication: true }})
          .when('/comments', {templateUrl: './partials/entity.html', controller: 'entityCtrl', access: { requiredAuthentication: true }})
          .when('/photos', {templateUrl: './partials/entity.html', controller: 'entityCtrl', access: { requiredAuthentication: true }})
          .when('/posts', {templateUrl: './partials/entity.html', controller: 'entityCtrl', access: { requiredAuthentication: true }})
          .when('/todos', {templateUrl: './partials/entity.html', controller: 'entityCtrl', access: { requiredAuthentication: true }})
          .when('/users', {templateUrl: './partials/entity.html', controller: 'entityCtrl', access: { requiredAuthentication: true }})
          .otherwise({redirectTo: '/'});
        
        $location.html5Mode(true);
        $httpProvider.interceptors.push('TokenInterceptor');        
    }])
    .run(['$rootScope', '$location', '$window', 'AuthenticationService', function($rootScope, $location,  $window, AuthenticationService){
        console.log("Run appSite");
       
        $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
            //redirect only if both isAuthenticated is false and no token is set
            if (nextRoute != null && nextRoute.access != null && nextRoute.access.requiredAuthentication 
                && !AuthenticationService.isAuthenticated && !$window.sessionStorage.token) {

                $location.path("/login");
            }
        });
    }])
