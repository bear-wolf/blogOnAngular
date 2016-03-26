'use strict';

angular.module('appSite',['ngRoute', 'ngMessages', 'ngResource',
                          'globalModules', 'adminModules', 'authModules', 'userModules', 'albumModules', 'photoModules', 'postModules'])
    .config([ '$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider, $location, $httpProvider) {
        //console.log("Configuration appSite");
        $routeProvider
          .when('/', { templateUrl: './partials/main.html',controller: 'AdminCtrl'})
          .when('/login', { templateUrl: './partials/login.html', controller: 'authCtrl'})
          .when('/albums', { 
                    templateUrl: './partials/albums/index.html', 
                    controller: 'albumCtrl',
                    access: { requiredAuthentication: true }})    
          .when('/albums/:albumId', { 
                    templateUrl: './partials/albums/index.html', 
                    controller: 'albumEditCtrl',
                    access: { requiredAuthentication: true }})          
          .when('/comments', {templateUrl: './partials/entity.html', controller: 'entityCtrl', access: { requiredAuthentication: true }})
          .when('/photos', {
            templateUrl: './partials/photos/index.html', 
            controller: 'photoCtrl', 
            access: { requiredAuthentication: true }})
          .when('/photos/:id', { 
                templateUrl: './partials/photos/index.html', 
                controller: 'photoEditCtrl',
                access: { requiredAuthentication: true }})  
          .when('/posts', {
                templateUrl: './partials/posts/index.html',
                controller: 'postCtrl',
                access: { requiredAuthentication: true }})
        .when('/posts/:id', {
                templateUrl: './partials/posts/index.html',
                controller: 'postCtrl',
                access: { requiredAuthentication: true }})
          .when('/todos', {templateUrl: './partials/entity.html', controller: 'entityCtrl', access: { requiredAuthentication: true }})
          .when('/users/', {   
                    controller:'usersCtrl', 
                    templateUrl: './partials/users/index.html',                
                    entity: 'users',
                    access: { requiredAuthentication: true }
            })
          .when('/users/:userId', {   
                controller:'usersCtrl', 
                templateUrl:'./partials/users/index.html',                
                entity: 'usersEdit',
                access: { requiredAuthentication: true }
            })
          .otherwise({redirectTo: '/'});
        
        $location.html5Mode(true).hashPrefix('!');
        $httpProvider.interceptors.push('AuthInterceptor');
    }])
    .run(['$rootScope', '$location', '$window', 'AuthenticationService', function($rootScope, $location,  $window, AuthenticationService){
        //console.log("Run appSite");
       
        $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
            //redirect only if both isAuthenticated is false and no token is set
            if (nextRoute != null && nextRoute.access != null && nextRoute.access.requiredAuthentication 
                //&& !AuthenticationService.isAuthenticated
                && !$window.sessionStorage.token) {

                $location.path("/login");
            }
        });
    }])
