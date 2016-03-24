(function(angular){
    angular.module('authModule', [
        'authControllers',
        'authInterceptors',
        'authServices',
        'constModule'
    ])
    .config([function(){
        //console.log("authModule is cofiguration")
    }])
    .run([function(){
    }]);
    
    angular.module('authControllers',[])
    .controller('authCtrl', [ '$scope', '$location', '$window', 'AuthenticationService', function($scope, $location, $window, AuthenticationService){                
                        
        if (AuthenticationService.isLogged)
            {
                $scope.user.toDispay = $scope.user.usename;
            } else AuthenticationService.isLogged = false;                        
                
        $scope.logIn = function(username, email){
            AuthenticationService.login($scope.username, $scope.email).then(function(data){
                $scope.model.user = data[0];
                $location.path("/");
            }, function(data){
                debugger;
            }); 
        }
                    
        $scope.logout = function logout() {
            if (AuthenticationService.isLogged) {
                AuthenticationService.isLogged = false;
                delete $window.sessionStorage.token;
                $location.path("/");
            }
        }    
        
//	   if (AuthenticationService.isLogged) {
//			$scope.isAuthenticated = true;
//		}
		   
        //Admin User Controller (login, logout)
//        $scope.logIn = function logIn(username, email) {
//            if (username !== undefined && email !== undefined) {
// 
//                UserService.logIn(username, email).success(function(data) {
//					if (data.length!=0)
//						{
//							AuthenticationService.isLogged = true;
//							$window.sessionStorage.token = data.token;
//							$location.path("/");
//						}
//                }).error(function(status, data) {
//                    console.log(status);
//                    console.log(data);
//                });                
//            }
//        }
//         
    }]);
    
    angular.module('authInterceptors', [])
    .service('AuthInterceptor',['$injector', '$location', function ($injector, $location) {
        return {
              request: function (config) {
                    var Auth = $injector.get('AuthenticationService');
                    var token = Auth.getToken();
                                    
                    if (token) {
                      config.headers['Authorization'] = 'JWT ' + token;
                    }
                    return config;
              },

              responseError: function (response) {
                    if (response.status === 403) {
                        $location.path('/login');
                    }
                    return response;
              }
            };
        
      }]);
    
    angular.module('authServices', [])
    .service('AuthenticationService', ['$http', '$location', '$q', '$window', 'PATH', function ($http, $location, $q, $window, PATH) {
        var Auth = {
          getToken: function () {
            return $window.localStorage.getItem('token');
          },
          isLogged: false,            
          login: function (username, email) {
              var deferred = $q.defer();

              $http.get(PATH.users+"?username="+username+"&email="+email)              
              .success( function (response, status, headers, config) {
                  if (response.length!=0)
                      {
                            if (response.token == undefined) { 
                                Auth.setToken(response[0].username); 
                                Auth.isLogged = true;                                
                            }                  
                            deferred.resolve(response, status, headers, config);   
                      }                
              })
              .error(function (response, status, headers, config) {
                deferred.reject(response, status, headers, config);
              });

              return deferred.promise;
          },
          logout: function () {
              Auth.deleteToken();
              $window.location = '/';
          },
            
          setToken: function (token) {
            $window.localStorage.setItem('token', token);
          },

          deleteToken: function () {
            $window.localStorage.removeItem('token');
          }
        };

        return Auth;
    }]);

})(window.angular);