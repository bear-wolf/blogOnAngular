(function(angular){
    'use strict';
    
    angular.module('commentModules',[ 'commentControllers', 'commentServices'])
    .config([function(){
        //console.log("userModules :: config");
    }])
    .run([function(){
        //console.log("userModules :: running");
    }])
    
    angular.module('commentControllers',[])
    .controller('commentsCtrl',['$scope','commentService', '$routeParams', '$location', function($scope, commentService, $routeParams, $location){
         
        $scope.commentId = $routeParams.id;
        $scope.postId = $routeParams.postId;
        $scope.postTitle = $routeParams.postTitle;
        $scope.link = "comments/";
        $scope.message = null;                    
        
        new commentService.getByPostId($scope.postId).then(function(data){                                     
            $scope.comments = ($scope.commentId == undefined) ? data : data[0];            
        });  
    }])    
    .controller('commentsEditCtrl',['$scope','commentService','$routeParams', function($scope, commentService, $routeParams){        
        
        $scope.commentId = $routeParams.Id;
        $scope.postTitle = $routeParams.postTitle;
        $scope.comment = {
            id : null,
            userId : null,
            title: null          
        }        
        
        new commentService.getById($routeParams.commentId).then(function(data){                                     
            $scope.comment = data[0];            
            return $scope.comment;
            });  
        
        $scope.save = function(form){                         
            new commentService.save(this.comment).then(function(data){                    
                $scope.message = "Your saving was successfuly";
                //$location.path("/comment");
            }, function(){ 
                $scope.message = "This is error during save of user";                    
            });
        };
    }])
    .directive("editcommenttmpl", function(){
       return {
           controller:"usersCtrl",
           templateUrl: "partials/comments/edit.html",
           link : function($scope, element, attributes) {
               
               $scope.linkToBack = "comments/"
           }
       } 
    });
        
    angular.module('commentServices',['constModules'])
    .service('commentService',['$http', '$q','PATH', function($http, $q, PATH){       
                        
        var Comment = {
                getByPostId : function(id){
                     var deferred = $q.defer();
                     $http.get(PATH.comments+"?postId="+id)              
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
                     $http.get(PATH.comments)              
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
                     $http.get(PATH.comments+"/"+id)              
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
                     $http.post(PATH.comments, data)              
                         .success(function(data, status, headers, config) {
                            deferred.resolve(data);
                         })
                         .error(function(data, status, headers, config) {
                            deferred.reject(status);
                        });

                    return deferred.promise;
                },  
            }
            
        return Comment; 
    }]);
        
})(window.angular);