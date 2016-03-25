(function(angular){    
    
    angular.module('adminModules',[
        'adminService'        
    ])
    .config([function(){
        console.log("Admin Modules:: config");
    }])
    .run([function(){
        console.log("Admin Modules:: running");
    }])
    .controller('AdminCtrl',['$scope',function($scope){                        
        $scope.setItem = function(item){
            location.hash = item;
            location.reload;                      
        };
    }])
    .controller('entityCtrl',['$scope','entityService', '$route', '$routeParams', function($scope, entityService, $route, $routeParams){
        console.log("entityCtrl -1- from adminModule:: running");             
        var entity = $route.current.$$route.entity;
        $scope.userId = $routeParams.userId;
        switch (entity)
            {
                case "albums": { 
                    entityService.albums.get().then(function(data){ 
                        $scope.albums = data;
                    });           
                    break;
                }
                case "comments": { 
                    entityService.comments.get().then(function(data){ 
                        $scope.comments = data;
                    });           
                    break;
                }                    
               
                default: break;
            }   
    }])
    .directive("navtmpl", function(){
       return {        
           templateUrl: 'partials/nav.html',        
            link: function($scope, element, attributes) {
            }
        }
    })
//    .directive("edittmpl", function(){
//       return {
//           controller:"entityCtrl",
//           templateUrl: "partials/users/edit.html",
//           link : function($scope, element, attributes) {
//               
//               $scope.linkToBack = "users/"
//           }
//       } 
//    });
    
    angular.module('adminService',['constModules'])
    .service('entityService',['$http', '$q','PATH', 'AuthenticationService', function($http, $q, PATH, AuthenticationService){       
                        
        var Services = {
            users : {
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
            },
            albums:{
                get: function(){
                     var deferred = $q.defer();
                     $http({method: 'GET', url: valueConst.server+'albums'})
                         .success(function(data, status, headers, config) { deferred.resolve(data);})
                         .error(function(data, status, headers, config) { deferred.reject(status);});

                    return deferred.promise;
                }
            },
            comments:{
                get: function(){
                     var deferred = $q.defer();
                     $http({method: 'GET', url: valueConst.server+'comments'})
                         .success(function(data, status, headers, config) { deferred.resolve(data);})
                         .error(function(data, status, headers, config) { deferred.reject(status);});

                    return deferred.promise;
                }
            }
        }
            
        return Services; 
    }])
    
})(window.angular);