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
        $scope.title = "Admin panel";
    }]);
    
})(window.angular);