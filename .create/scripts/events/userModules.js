(function(angular){
    'use strict';
    
    angular.module('userModules',[ 'authModules', 'userControllers', 'userServices'])
    .config([function(){
        //console.log("userModules :: config");
    }])
    .run([function(){
        //console.log("userModules :: running");
    }])
    
    angular.module('userControllers',[])
    .controller('usersCtrl',['$scope','userService', '$routeParams', '$location', function($scope, userService, $routeParams, $location){
        $scope.userId = $routeParams.userId;
        $scope.link = "users/";
        
        this.message = null;
        this.users = {
            id : null,
            name : null,
            username: null,
            email: null,
            address: {
                street: null,
                suite: null,
                city: null,
                zipcode: null,
                geo: {
                  lat: null,
                  lng: null
                }
              },
          phone: null,
          website: null,
          company: {
            name: null,
            catchPhrase: null,
            bs: null
          }
        };        
        
        $scope.users = this.users;
        
        new userService.getByUserEmail($scope.model.user).then(function(data){                                     
            $scope.users = ($scope.userId==undefined) ? data : data[0];            
        });  
        
        $scope.save = function(form){            
             if(form.$valid) { 
                new userService.save(this.users).then(function(data){                    
                    $scope.message = "Your saving was successfuly";
                    //$location.path("/users");
                }, function(){ 
                    $scope.message = "This is error during save of user";                    
                });
           }
        };
    }])    
    .directive("edittmpl", function(){
       return {
           controller:"usersCtrl",
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
                get : function(){
                     var deferred = $q.defer();
                     $http.get(PATH.users)              
                         .success(function(data, status, headers, config) {
                            deferred.resolve(data);
                         })
                         .error(function(data, status, headers, config) {
                            deferred.reject(status);
                        });

                    return deferred.promise;
                },  
                save: function(data){
                     var deferred = $q.defer();
                     $http.post(PATH.users, data)              
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
    }]);
        
})(window.angular);