(function(angular){
    
    angular.module('globalModule',[])
    .config([function(){
        console.log("Global Module:: config");
    }])
    .run([function(){
        console.log("Global Module:: running");
    }])
    .controller('MainCtrl',['$scope',function($scope){
        console.log("MainCtrl from globalModule:: running");
        var model = {
            title : "Admin panel",       
            tables : ['albums',
                      'comments',
//                      'photos',
//                      'posts', 
//                      'todos',
                      'users']
        };
                
        $scope.model = model;
    }])
    .directive("authorization", function(){
        return{
            templateUrl: 'partials/authorization.html'
        }
    });
    
})(window.angular);