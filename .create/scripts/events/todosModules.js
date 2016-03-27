(function(angular){
    'use strict';
    
    angular.module('todosModules',[ 'todoControllers', 'todoServices'])
    .config([function(){
        //console.log("userModules :: config");
    }])
    .run([function(){
        //console.log("userModules :: running");
    }])
    
    angular.module('todoControllers',[])
    .controller('todosCtrl',['$scope','todoService', '$location', function($scope, todoService, $location){                       
        $scope.message = null;                 
        new todoService.getByUserId($scope.model.user.id).then(function(data){                                     
            $scope.todos = ($scope.todoId == undefined) ? data : data[0];            
            $scope.link = "todos/";
        });         
    }])
    .controller('todosEditCtrl',['$scope','todoService', '$routeParams', '$location', function($scope, todoService, $routeParams, $location){
        $scope.todoId = $routeParams.id;
        $scope.linkToBack = "todos/";
        
        this.todo = {
            id : $routeParams.id,
            userId : null,
            title: null,
            completed: null
        };  
        
        new todoService.getById(this.todo.id).then(function(data){                                                  
            $scope.todo = data;            
            return $scope.todo;
        });  
        $scope.save = function(nameForm){                         
            return new todoService.save(this.todo).then(function(data){                    
                    $scope.message = "Your saving was successfuly";                    
                }, function(){ 
                    $scope.message = "This is error during save of user";                    
                });           
        };
    }])
    .directive("edittodostmpl", function(){
       return {
           templateUrl: "partials/todos/edit.html",
           link : function($scope, element, attributes) {               
           }
       } 
    });
        
    angular.module('todoServices',['constModules'])
    .service('todoService',['$http', '$q','PATH', function($http, $q, PATH){       
                        
        var Todo = {
                getByUserId : function(id){
                     var deferred = $q.defer();
                     $http.get(PATH.todos+"?userId="+id)              
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
                     $http.get(PATH.todos+"/"+id)              
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
                     $http.get(PATH.todos)              
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
                     $http.post(PATH.todos, data)              
                         .success(function(data, status, headers, config) {
                            deferred.resolve(data);
                         })
                         .error(function(data, status, headers, config) {
                            deferred.reject(status);
                        });

                    return deferred.promise;
                },  
            }
            
        return Todo; 
    }]);
        
})(window.angular);