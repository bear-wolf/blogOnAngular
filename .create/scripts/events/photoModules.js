(function(angular){
    'use strict';
    
    angular.module('photoModules', [ 'photoControllers','photoServices'])
    .config([function(){
        //console.log("photoModules :: config");
    }])
    .run([function(){
        //console.log("photoModules :: running");
    }]);
    
    angular.module('photoControllers',[])
    .controller('photoCtrl',['$scope','photoService', '$routeParams', '$location','$q', function($scope, photoService, $routeParams, $location, $q){
        $scope.albumId = $routeParams.albumId;
        $scope.albumTitle = $routeParams.albumTitle;
        $scope.photosId = $routeParams.id;
        $scope.link = "photos/";
        //albumName
        
        this.message = null;          
//        $scope.album = this.album;        
        $scope.sort = 'title';
        $scope.reverse = true;
        
        var promises = [];
        promises.push(new photoService.getByAlbumId($scope.albumId).then(function(data){
             return ($scope.photosId == undefined) ? data : data[0];          
        }));
        
        $q.all(promises).then(function (results) {            
            $scope.photos = results[0];
        });        
         
       
        $scope.remove = function(id)
        {
            if (confirm("You confirm removal?"))
                {
                    alert("ok");
                }
        }         
        $scope.sorting = function(current) {
            $scope.reverse = ($scope.sort === current) ? !$scope.reverse : false;
            $scope.sort = current;
          };
    }]) 
    .controller('photoEditCtrl',['$scope','photoService', '$routeParams', '$location','$q', function($scope, photoService, $routeParams, $location, $q){
        
        $scope.photosId = $routeParams.id;
        this.photos = {
             albumId: null,
             id: null,
             title: null,
             url: null,
             thumbnailUrl: null
        };  
        
        new photoService.getById($routeParams.id).then(function(data){                                     
            $scope.photos = data;            
            return $scope.photos;
            });  
        $scope.save = function(form){            
             if(form.$valid) { 
                new photoService.save(this.photos).then(function(data){                    
                    $scope.message = "Your saving was successfuly";
                    //$location.path("/users");
                }, function(){ 
                    $scope.message = "This is error during save of user";                    
                });
           }
        };
    }])      
    .directive("editphotostmpl", function(){
       return {
           templateUrl: "partials/photos/edit.html",
           link : function($scope, element, attributes) {               
               $scope.linkToBack = "photos/"
           }
       } 
    });
    
    angular.module('photoServices', ['constModules'])
    .service('photoService', ['$http', '$q','PATH', function($http, $q, PATH){       
                        
        var Photo = {
                get : function(){
                     var deferred = $q.defer();
                     $http.get(PATH.photos)              
                         .success(function(data, status, headers, config) {
                            deferred.resolve(data);
                         })
                         .error(function(data, status, headers, config) {
                            deferred.reject(status);
                        });

                    return deferred.promise;
                },  
                getByAlbumId : function(id){
                     var deferred = $q.defer();
                     $http.get(PATH.photos+"?albumId="+id)              
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
                     $http.get(PATH.photos+"/"+id)              
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
                     $http.post(PATH.photos, data)              
                         .success(function(data, status, headers, config) {
                            deferred.resolve(data);
                         })
                         .error(function(data, status, headers, config) {
                            deferred.reject(status);
                        });

                    return deferred.promise;
                },  
            }
            
        return Photo; 
    }])
    
})(window.angular);