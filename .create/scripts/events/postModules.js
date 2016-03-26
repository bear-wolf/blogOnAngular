(function(angular){
    'use strict';
    
    angular.module('postModules', [ 'postControllers','postServices'])
    .config([function(){
        //console.log("photoModules :: config");
    }])
    .run([function(){
        //console.log("photoModules :: running");
    }]);
    
    angular.module('postControllers',[])
    .controller('postCtrl',['$scope','postService', '$routeParams', '$location','$q', function($scope, postService, $routeParams, $location, $q){
        debugger;
        $scope.postsId = $routeParams.postsId;
        $scope.link = "posts/";
        
        this.message = null;          
        $scope.album = this.album;        
        $scope.sort = 'title';
        $scope.reverse = true;
        
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
        $scope.sorting = function(current) {
            $scope.reverse = ($scope.sort === current) ? !$scope.reverse : false;
            $scope.sort = current;
          };
    }]) 
    .controller('postEditCtrl',['$scope','postService', '$routeParams', '$location','$q', function($scope, postService, $routeParams, $location, $q){
       
    }])      
    .directive("editposttmpl", function(){
       return {
           templateUrl: "partials/posts/edit.html",
           link : function($scope, element, attributes) {               
               $scope.linkToBack = "posts/"
           }
       } 
    });
    
    angular.module('postServices', ['constModules'])
    .service('postService', ['$http', '$q','PATH', function($http, $q, PATH){       
                        
        var Post = {
//                get : function(){
//                     var deferred = $q.defer();
//                     $http.get(PATH.photos)              
//                         .success(function(data, status, headers, config) {
//                            deferred.resolve(data);
//                         })
//                         .error(function(data, status, headers, config) {
//                            deferred.reject(status);
//                        });
//
//                    return deferred.promise;
//                },  
//                getByAlbumId : function(id){
//                     var deferred = $q.defer();
//                     $http.get(PATH.photos+"?albumId="+id)              
//                         .success(function(data, status, headers, config) {
//                            deferred.resolve(data);
//                         })
//                         .error(function(data, status, headers, config) {
//                            deferred.reject(status);
//                        });
//
//                    return deferred.promise;
//                },  
//                getById : function(id){
//                     var deferred = $q.defer();
//                     $http.get(PATH.photos+"/"+id)              
//                         .success(function(data, status, headers, config) {
//                            deferred.resolve(data);
//                         })
//                         .error(function(data, status, headers, config) {
//                            deferred.reject(status);
//                        });
//
//                    return deferred.promise;
//                },  
//                save: function(data){
//                     var deferred = $q.defer();
//                     $http.post(PATH.photos, data)              
//                         .success(function(data, status, headers, config) {
//                            deferred.resolve(data);
//                         })
//                         .error(function(data, status, headers, config) {
//                            deferred.reject(status);
//                        });
//
//                    return deferred.promise;
//                },  
            }
            
        return Post; 
    }])
    
})(window.angular);