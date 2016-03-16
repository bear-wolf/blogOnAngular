'use strict';


//var resouce = require('./angular-resource');
//'', 'ngResource', 'appControllers'

angular.module('appSite',['ngRoute','globalModule','adminModule'])
    .config(['$routeProvider',function($routeProvider) {
        console.log("Configuration appSite");
        $routeProvider.when('/', {
            templateUrl: './partials/main.html',
            controller: 'AdminCtrl'
          }).
          otherwise({
            redirectTo: '/'
          });
    }])
    .run([function(){
        console.log("Run appSite");
    }])
//    .controller('MainCtrl',['$scope',function($scope){
//        console.log("MainCtrl:: running ");
//        $scope.text = "hello";
//    }]);
