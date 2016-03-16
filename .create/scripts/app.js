'use strict';


//var resouce = require('./angular-resource');
//'ngRoute', 'ngResource', 'appControllers'

angular.module('appSite',['globalModule'])
    //.config(['$routeProvider',function($routeProvider) {
      //  console.log("Configuration appSite");
//        $routeProvider.when('/', {
//            templateUrl: './partials/main.html',
//            controller: 'mainCtrl'
//          }).
//          otherwise({
//            redirectTo: '/'
//          });
    //}])
    .run([function(){
        console.log("Run appSite");
    }])
    .controller('MainCtrl',['$scope',function($scope){
        console.log("MainCtrl:: running ");
        $scope.text = "hello";
    }]);
