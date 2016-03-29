(function(angular){
    'use strict';
    
    angular.module('albumModules',[ 'authModules', 'albumControllers', 'albumServices'])
    .config([function(){
        //console.log("albumModules :: config");
    }])
    .run([function(){
        //console.log("albumModules :: running");
    }])
    
    angular.module('albumControllers',[])
    .controller('albumCtrl',['$scope','albumService', '$routeParams', '$location', '$q', 'userService', function($scope, albumService, $routeParams, $location, $q, userService){                
        $scope.albumId = $routeParams.albumId;
        $scope.link = "albums/";
        
        this.message = null;          
        $scope.album = this.album;        
                
        var promises = [];
        promises.push(albumGet());
        promises.push(userService.get());
        
        $q.all(promises).then(function (results) {
            var albums = results[0];
            var user = results[1];
            for(var i=0; i<albums.length; i++)
                {
                    for(var j = 0; j< user.length; j++)
                    {
                        if (albums[i].userId == user[j].id) 
                        {
                            albums[i].userName = user[j].name;
                            break;
                        }
                    }
                }
            $scope.albums = albums;
        });        
        
        function albumGet()
        {
            return new albumService.getByUserId($scope.model.user.id).then(function(data){                                     
                return ($scope.albumId == undefined) ? data : data[0];            
            });  
        }        
       
        $scope.remove = function(id)
        {
            if (confirm("You confirm removal?"))
                {
                    alert("ok");
                }
        }            
    }])    
    .controller('albumEditCtrl',['$scope','albumService','$routeParams', function($scope, albumService, $routeParams){
        $scope.albumId = $routeParams.albumId;
        $scope.titleFilter = ["ntext"];        
        $scope.albums = [{
            id : null,
            userId : null,
            title: null          
        }];  
        
        new albumService.getById($routeParams.albumId).then(function(data){                                     
            $scope.albums[0] = data[0];                        
            });  
        $scope.save = function(form){                         
            new albumService.save(this.albums).then(function(data){                    
                $scope.message = "Your saving was successfuly";
                //$location.path("/users");
            }, function(){ 
                $scope.message = "This is error during save of user";                    
            });           
        };
    }])
    .controller("albumCreateCtrl", [ '$scope','$location', 'albumService', function($scope, $location, albumService){        
         $scope.save = function(form){            
             if(confirm("Create an album?")) { 
                new albumService.save(this.albums).then(function(data){                    
                    $scope.message = "Your saving was successfuly";
                    //$location.path("/users");
                }, function(){ 
                    $scope.message = "This is error during save of user";                    
                });
           }
             else
             {
                 $location.path("/album");
             }
        };
    }])
    .directive("editalbumtmpl", function(){
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
                getById : function(id){
                     var deferred = $q.defer();
                     $http.get(PATH.albums+"?id="+id)              
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