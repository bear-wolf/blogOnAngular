'use strict';


//var resouce = require('./angular-resource');
//'', 'ngResource', 'appControllers'

angular.module('appSite',['ngRoute', 'ngResource', 'globalModule', 'adminModule'])
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        console.log("Configuration appSite");
        $routeProvider
          .when('/', { templateUrl: './partials/main.html',controller: 'AdminCtrl'})
          .when('/albums', {templateUrl: './partials/albums.html', controller: 'AdminCtrl'})
          .otherwise({redirectTo: '/'});
        $locationProvider.html5Mode(true);
    }])
    .run([function(){
        console.log("Run appSite");
    }])
//    .controller('MainCtrl',['$scope',function($scope){
//        console.log("MainCtrl:: running ");
//        $scope.text = "hello";
//    }]);
