(function(angular){    
    
    angular.module('adminModule',['ngResource', 'servicesModule'])
    .config([function(){
        console.log("Admin Module:: config");
    }])
    .run([function(){
        console.log("Admin Module:: running");
    }])
    .controller('AdminCtrl',['$scope','userService',function($scope, userService){
        console.log("AdminCtrl from adminModule:: running");
                
        $scope.setItem = function(item){
            location.hash = item;
            location.reload;
//            userService.get().then(function(data){
//                $scope.model.user = data;
//            });                        
        };
    }])
    
})(window.angular);