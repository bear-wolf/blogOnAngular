(function(angular){
    
    angular.module('adminModule',[])
    .config([function(){
        console.log("Admin Module:: config");
    }])
    .run([function(){
        console.log("Admin Module:: running");
    }])
    .controller('AdminCtrl',['$scope',function($scope){
        console.log("AdminCtrl from adminModule:: running");
        $scope.text = "Hello world from global Module";
    }]);
    
})(window.angular);