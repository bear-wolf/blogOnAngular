(function(angular){
    angular.module('authModules', [
        'authControllers',
        'authInterceptors',
        'authServices',
        'constModules'
    ])
    .config([function(){
        //console.log("authModules is cofiguration")
    }])
    .run([function(){
    }]);
    
    angular.module('authControllers',[])
    .controller('authCtrl', [ '$scope', '$location', '$window', 'AuthenticationService', function($scope, $location, $window, AuthenticationService){                
        
        $scope.message = null;
        
        if (AuthenticationService.isLogged)
            {
                $scope.model.user = angular.fromJson(AuthenticationService.getStorage("user"));
                if ($scope.model.user == null)
                    {
                        AuthenticationService.isLogged = false;
                        $scope.model.isLogged = false;
                    }
                else {
                    $scope.model.user.toDispay = $scope.model.user.username;                
                    $scope.model.isLogged = true;                    
                }
            } else 
            {
                $scope.model.isLogged = false;
                AuthenticationService.isLogged = false;
                AuthenticationService.removeSorage("user");
            }
                
        $scope.logIn = function(username, email){
            AuthenticationService.login($scope.username, $scope.email).then(function(data){
            $scope.message = null;
            $scope.isLogged = false;
            if (data.length == 1)
                  {
                    AuthenticationService.setToken(data[0].username); 
                    AuthenticationService.isLogged = true;                                
                    $scope.user = data[0];
                    $scope.isLogged = true;
                    AuthenticationService.setSorage("user", data[0])                                                             
                    $location.path("/");
                    $window.location.reload();  
                  }                  
                else {
                    $scope.message = "User is not exist";
                }
            },function(data){
                throw "This is an exception";
            }); 
        }
                    
        $scope.logout = function logout() {            
                AuthenticationService.isLogged = false;
                AuthenticationService.removeSorage("user");
                $location.path("/");  
                $window.location.reload();  
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
            return $window.sessionStorage.getItem('token');
          },          
          login: function (username, email) {
              var deferred = $q.defer();

              $http.get(PATH.users+"?username="+username+"&email="+email)              
              .success( function (response, status, headers, config) {                  
                    deferred.resolve(response, status, headers, config);              
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
                return $window.sessionStorage.setItem('token', token);
          },
          getStorage:function(key)
          {
                return $window.sessionStorage[key];
          },
          setSorage: function (key, data) {           
              $window.sessionStorage[key] = angular.toJson(data);
          },
          removeSorage: function (key) {
            $window.sessionStorage.removeItem(key);
          },

          deleteToken: function () {
            $window.sessionStorage.removeItem('token');
          }
        };
        Auth.isLogged = Auth.getToken() == null ? false : true;           

        return Auth;
    }]);

})(window.angular);