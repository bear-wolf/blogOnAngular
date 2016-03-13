'use strict';


//var resouce = require('./angular-resource');

var app = angular.module('appSite', [
  'ngRoute',
  'ngResource',
  'appControllers'
//  'appFilters',
//  'appServices'
]);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: './partials/main.html',
        controller: 'mainCtrl'
      }).
//      when('/phones/:phoneId', {
//        templateUrl: 'partials/phone-detail.html',
//        controller: 'PhoneDetailCtrl'
//      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
