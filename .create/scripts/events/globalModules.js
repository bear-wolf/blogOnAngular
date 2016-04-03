(function(angular){
    'use strict';
    
    angular.module('globalModules',[ 'authModules'])
    .config([function(){
        //console.log("Global Module:: config");
    }])
    .run([function(){
        //console.log("Global Module:: running");
    }])
    .controller('MainCtrl',['$scope',function($scope){        
        var model = {
            title : "Admin panel",       
            tables : ['albums',
                      'posts', 
                      'todos',
                      'users'
//                      'photos'
                     ],
            user: null,
            isLogged:false
        };
        
         $scope.sort = 'title';
         $scope.reverse = true;
         $scope.sorting = function(current) {
            $scope.reverse = ($scope.sort === current) ? !$scope.reverse : false;
            $scope.sort = current;
          };
                
        $scope.model = model;
    }])    
    .directive("authorization", function(){
        return{
            templateUrl: 'partials/authorization.html'
        }
    });
    
})(window.angular);