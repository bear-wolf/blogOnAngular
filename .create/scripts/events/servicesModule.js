(function(angular){
    
    var valueConst ={
              client: "http://localhost:9000/",
              server: "http://localhost:3000/"
          }
    
    angular.module('servicesModule',['ngResource'])
    .config([function(){
        console.log("Service Module:: config");
    }])
    .run([function(){
        console.log("Service Module:: running");
    }])
//    .constant('PATH', {
//      url:{
//              server: "http://localhost:9000/",
//              client: "http://localhost:3000/"
//          }
//    })
    .service('entityService',['$http', '$q', function($http, $q){       
        return {
            users: {
                get : function(){
                     var deferred = $q.defer();
                     $http({method: 'GET', url: valueConst.server+'users'})
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
                     $http({method: 'GET', url: valueConst.server+'users/:id'})
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
    }])
    .service('сredentialsService',['$http', '$q', function($http, $q){       
        return {            
            verify : function(){
                 var deferred = $q.defer();
                 $http({method: 'GET', url: valueConst.server +'users'})
                     .success(function(data, status, headers, config) {
                        deferred.resolve(data);
                     })
                     .error(function(data, status, headers, config) {
                        deferred.reject(status);
                    });

                return deferred.promise;
            }            
        }    
    }])
    .factory('AuthenticationService',[ function() {
        var auth = {
            isLogged: false
        }
 
        return auth;
    }])
    .factory('UserService',[ '$http', function($http) {
        return {
            logIn: function(username, password) {
                return $http.post(valueConst.server + 'login', {username: username, password: password});
                //return $http.post(valueConst.client + 'index.js', { username: username, password: password});
            },
            logOut: function() {

            }
        }
    }])
    .factory('TokenInterceptor', ['$q', '$window', '$location', 'AuthenticationService', function ($q, $window, $location, AuthenticationService) {
        return {
            request: function (config) {
                config.headers = config.headers || {};
                if ($window.sessionStorage.token) {
                    config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
                }
                return config;
            },

            requestError: function(rejection) {
                return $q.reject(rejection);
            },

            /* Set Authentication.isAuthenticated to true if 200 received */
            response: function (response) {
                if (response != null && response.status == 200 && $window.sessionStorage.token && !AuthenticationService.isAuthenticated) {
                    AuthenticationService.isAuthenticated = true;
                }
                return response || $q.when(response);
            },

            /* Revoke client authentication if 401 is received */
            responseError: function(rejection) {
                if (rejection != null && rejection.status === 401 && ($window.sessionStorage.token || AuthenticationService.isAuthenticated)) {
                    delete $window.sessionStorage.token;
                    AuthenticationService.isAuthenticated = false;
                    $location.path("/login");
                }

                return $q.reject(rejection);
            }
        };
    }]);    
    
})(window.angular);
