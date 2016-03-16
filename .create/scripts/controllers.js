'use strict';

/* Controllers */

var mainControllers = angular.module('mainControllers', []);

var url = "http://localhost:3000/";

mainControllers.controller('mainCtrl', ['$scope', '$resource',
  function($scope, $resource) {
      
     $resource.action(url+"users", function(data){
//         $scope.users = data;
     } , function(data) {
//          $.growl.error({ message: "The users json is not-working!" });
     });
      
  }]);

//mainControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
//  function($scope, $routeParams, Phone) {
//    $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
//      $scope.mainImageUrl = phone.images[0];
//    });
//
//    $scope.setImage = function(imageUrl) {
//      $scope.mainImageUrl = imageUrl;
//    };
//  }]);

