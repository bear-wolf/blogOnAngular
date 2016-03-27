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
    .controller('postsCtrl',['$scope','postService', '$routeParams', '$location','$q' ,'userService', function($scope, postService, $routeParams, $location, $q, userService){        
        $scope.postId = $routeParams.postsId;
        $scope.link = "posts/";
        
        this.message = null;          
        //$scope.album = this.album;        
        $scope.sort = 'title';
        $scope.reverse = true;
        
        function postGet(){
            return new postService.getByUserId($scope.model.user.id).then(function(data){                                     
                return ($scope.postId == undefined) ? data : data[0];            
        })};
        
        var promises = [];
        promises.push(postGet());
        promises.push(userService.get());
                
        $q.all(promises).then(function (results) {
            var posts = results[0];
            var user = results[1];
            for(var i=0; i<posts.length; i++)
                {
                    for(var j = 0; j< user.length; j++)
                    {
                        if (posts[i].userId == user[j].id) 
                        {
                            posts[i].userName = user[j].name;
                            break;
                        }
                    }
                }
            $scope.posts = posts;
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
    .controller('postsEditCtrl',['$scope','postService', '$routeParams', '$location','$q', function($scope, postService, $routeParams, $location, $q){        
        $scope.postId = $routeParams.id;
        this.post = {
            id : $routeParams.id,
            userId : null,
            title: null          
        };  
        
        new postService.getById(this.post.id).then(function(data){                                                  
            $scope.post = data;            
            return $scope.post;
            });  
        $scope.save = function(form){                         
            new postService.save(this.post).then(function(data){                    
                $scope.message = "Your saving was successfuly";
                //$location.path("/users");
            }, function(){ 
                $scope.message = "This is error during save of user";                    
            });
        };
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
                get : function(){
                     var deferred = $q.defer();
                     $http.get(PATH.posts)              
                         .success(function(data, status, headers, config) {
                            deferred.resolve(data);
                         })
                         .error(function(data, status, headers, config) {
                            deferred.reject(status);
                        });

                    return deferred.promise;
                },  
                getByUserId : function(id){
                     var deferred = $q.defer();
                     $http.get(PATH.posts+"?userId="+id)              
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
                     $http.get(PATH.posts+"/"+id)              
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
                     $http.post(PATH.posts, data)              
                         .success(function(data, status, headers, config) {
                            deferred.resolve(data);
                         })
                         .error(function(data, status, headers, config) {
                            deferred.reject(status);
                        });

                    return deferred.promise;
                }  
            }
            
        return Post; 
    }])
    
})(window.angular);