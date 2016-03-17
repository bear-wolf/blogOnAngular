(function(angular){
    
    var url = "http://localhost:3000/";
    
    angular.module('servicesModule',['ngResource'])
    .config([function(){
        console.log("Service Module:: config");
    }])
    .run([function(){
        console.log("Service Module:: running");
    }])
    .service('userService',['$http', '$q', function($http, $q){       
        this.get = function(){
             var deferred = $q.defer();
             $http({method: 'GET', url: url+'users'})
                 .success(function(data, status, headers, config) {
                    deferred.resolve(data);
                 })
                 .error(function(data, status, headers, config) {
                    deferred.reject(status);
                });
            
            return deferred.promise;
        }
    }]);
    
})(window.angular);
