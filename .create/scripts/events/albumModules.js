(function(angular){
    'use strict';
    
    angular.module('albumModules',[ 'authModules', 'albumControllers', 'albumServices'])
    .config([function(){
        console.log("albumModules :: config");
    }])
    .run([function(){
        console.log("albumModules :: running");
    }])
    
    angular.module('albumControllers',[])
    .controller('albumCtrl',['$scope','albumService', '$routeParams', '$location', function($scope, albumService, $routeParams, $location){                
        $scope.albumId = $routeParams.albumId;
        $scope.link = "albums/";
        
        this.message = null;
        this.albums = {
            id : null,
            userId : null,
            title: null          
        };        
        
        $scope.album = this.album;
        
        new albumService.getByUserId($scope.model.user.id).then(function(data){                                     
            $scope.albums = ($scope.albumId == undefined) ? data : data[0];            
        });  
        $scope.save = function(form){            
             if(form.$valid) { 
                new albumService.save(this.albums).then(function(data){                    
                    $scope.message = "Your saving was successfuly";
                    //$location.path("/users");
                }, function(){ 
                    $scope.message = "This is error during save of user";                    
                });
           }
        };
        $scope.remove = function(id)
        {
            if (confirm("You confirm removal?"))
                {
                    alert("ok");
                }
        }
    }])    
    .directive("editalmubtmpl", function(){
       return {
           templateUrl: "partials/albums/edit.html",
           link : function($scope, element, attributes) {               
               $scope.linkToBack = "albums/"
           }
       } 
    });
        
    angular.module('albumServices',['constModules'])
    .service('albumService',['$http', '$q','PATH', function($http, $q, PATH){       
                        
        var Albums = {
                getByUserId : function(id){
                     var deferred = $q.defer();
                     $http.get(PATH.albums+"?userId="+id)              
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
                     $http.post(PATH.albums, data)              
                         .success(function(data, status, headers, config) {
                            deferred.resolve(data);
                         })
                         .error(function(data, status, headers, config) {
                            deferred.reject(status);
                        });

                    return deferred.promise;
                },  
            }
            
        return Albums; 
    }])
        
})(window.angular);