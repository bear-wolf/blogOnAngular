(function(angular){    
    
    angular.module('adminModule',['ngResource', 'servicesModule'])
    .config([function(){
        console.log("Admin Module:: config");
    }])
    .run([function(){
        console.log("Admin Module:: running");
    }])
    .controller('AdminCtrl',['$scope','UserService',function($scope, UserService){
        console.log("AdminCtrl from adminModule:: running");
        
        var model = {};
        
        $scope.setItem = function(item){
            model.data = UserService.get();
            
            $scope.model = model;
        };
    }])
    
})(window.angular);