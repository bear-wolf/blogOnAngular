(function(angular){
    
    var url = "http://localhost:3000/";
    
    angular.module('servicesModule',['ngResource'])
    .config([function(){
        console.log("Service Module:: config");
    }])
    .run([function(){
        console.log("Service Module:: running");
    }])
    .service('entityService',['$http', '$q', function($http, $q){       
        return {
            users: {
                get : function(){
                     var deferred = $q.defer();
                     $http({method: 'GET', url: url+'users'})
                         .success(function(data, status, headers, config) {
                            deferred.resolve(data);
                         })
                         .error(function(data, status, headers, config) {
                            deferred.reject(status);
                        });

                    return deferred.promise;
                },
                getID:  function(id){
                     var deferred = $q.defer();
                     $http({method: 'GET', url: url+'users/:id'})
                         .success(function(data, status, headers, config) {
                            deferred.resolve(data);
                         })
                         .error(function(data, status, headers, config) {
                            deferred.reject(status);
                        });

                    return deferred.promise;
                }
            },
            albums:{
                get: function(){
                     var deferred = $q.defer();
                     $http({method: 'GET', url: url+'albums'})
                         .success(function(data, status, headers, config) { deferred.resolve(data);})
                         .error(function(data, status, headers, config) { deferred.reject(status);});

                    return deferred.promise;
                }
            },
            comments:{
                get: function(){
                     var deferred = $q.defer();
                     $http({method: 'GET', url: url+'comments'})
                         .success(function(data, status, headers, config) { deferred.resolve(data);})
                         .error(function(data, status, headers, config) { deferred.reject(status);});

                    return deferred.promise;
                }
            }
        }    
    }]);
    
})(window.angular);
