(function(angular){
    'use strict';
    
    angular.module('userModules',[ 'authModules', 'userControllers', 'userServices'])
    .config([function(){
        console.log("userModules :: config");
    }])
    .run([function(){
        console.log("userModules :: running");
    }])
    
    angular.module('userControllers',[])
    .controller('usersCtrl',['$scope','userService', '$route', '$routeParams', function($scope, userService, $route, $routeParams){
        console.log("usersCtrl from usersModule:: running");             
        //var entity = $route.current.$$route.entity;
        $scope.userId = $routeParams.userId;
        new userService.getByUserEmail($scope.model.user).then(function(data){                         
            $scope.users = data;
            $scope.link = "users/";
        });  
    }])    
    .directive("edittmpl", function(){
       return {
           controller:"entityCtrl",
           templateUrl: "partials/users/edit.html",
           link : function($scope, element, attributes) {
               
               $scope.linkToBack = "users/"
           }
       } 
    });
        
    angular.module('userServices',['constModules'])
    .service('userService',['$http', '$q','PATH', function($http, $q, PATH){       
                        
        var Users = {
                getByUserEmail : function(scope){
                     var deferred = $q.defer();
                     $http.get(PATH.users+"?username="+scope.username+"&email="+scope.email)              
                         .success(function(data, status, headers, config) {
                            deferred.resolve(data);
                         })
                         .error(function(data, status, headers, config) {
                            deferred.reject(status);
                        });

                    return deferred.promise;
                },            
            }
            
        return Users; 
    }])
        
})(window.angular);