'use strict';


//var resouce = require('./angular-resource');
//'', 'ngResource', 'appControllers'

angular.module('appSite',['ngRoute', 'ngResource', 'globalModule', 'adminModule'])
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        console.log("Configuration appSite");
        $routeProvider
          .when('/', { templateUrl: './partials/main.html',controller: 'AdminCtrl'})
          .when('/albums', {templateUrl: './partials/entity.html', controller: 'entityCtrl'})
          .when('/comments', {templateUrl: './partials/entity.html', controller: 'entityCtrl'})
          .when('/photos', {templateUrl: './partials/entity.html', controller: 'entityCtrl'})
          .when('/posts', {templateUrl: './partials/entity.html', controller: 'entityCtrl'})
          .when('/todos', {templateUrl: './partials/entity.html', controller: 'entityCtrl'})
          .when('/users', {templateUrl: './partials/entity.html', controller: 'entityCtrl'})
          .otherwise({redirectTo: '/'});
        $locationProvider.html5Mode(true);
    }])
    .run([function(){
        console.log("Run appSite");
    }])
