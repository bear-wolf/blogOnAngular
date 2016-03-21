(function(angular){
    'use strict';
    
    angular.module('globalModule',[])
    .config([function(){
        console.log("Global Module:: config");
    }])
    .run([function(){
        console.log("Global Module:: running");
    }])
    .controller('MainCtrl',['$scope',function($scope){
        console.log("MainCtrl from globalModule:: running");
        var model = {
            title : "Admin panel",       
            tables : ['albums',
                      'comments',
//                      'photos',
//                      'posts', 
//                      'todos',
                      'users']
        };
                
        $scope.model = model;
    }])
    .controller('adminUserCtrl', [ '$scope', '$location', '$window', 'UserService', 'AuthenticationService',
       function AdminUserCtrl($scope, $location, $window, UserService, AuthenticationService){        
        var _this = this;
        $scope.isAuthenticated = false;
        
        //Admin User Controller (login, logout)
        $scope.logIn = function logIn(username, password) {
            if (username !== undefined && password !== undefined) {
 
                UserService.logIn(username, password).success(function(data) {
                    AuthenticationService.isLogged = true;
                    $window.sessionStorage.token = data.token;
                    $location.path("/");
                }).error(function(status, data) {
                    console.log(status);
                    console.log(data);
                });                
            }
        }
 
        $scope.logout = function logout() {
            if (AuthenticationService.isLogged) {
                AuthenticationService.isLogged = false;
                delete $window.sessionStorage.token;
                $location.path("/");
            }
        }
        
//        $scope.submit = function() {
//            debugger;
//          return $http
//            .post('Page on localhost:3000', {
//              username: _this.username,
//              password: _this.password
//            })
//            .then(function(response) {
//                _this.isAuthenticated = true;
//                  localStorage['token'] = response.data.token;
//                  alert('Login successful');
//                }, function() {
//                  _this.isAuthenticated = false	;
//                  alert('Login fail');
//                });
//        }
//        $scope.fetch = function() {
//          return $http
//            .post('Page on localhost:3000')
//            .then(function() {
//              alert('Fetch resource successful');
//            }, function() {
//              alert('Can not fetch resource');
//            });
        
//        $scope.submit = function(){
////          console.log("submit");            
//            сredentialsService.verify($scope.username, $scope.password);
//        };
    
    }])
    .directive("authorization", function(){
        return{
            templateUrl: 'partials/authorization.html'
        }
    });
    
})(window.angular);