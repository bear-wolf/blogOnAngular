(function(angular){    
    
    angular.module('adminModule',['ngResource', 'servicesModule'])
    .config([function(){
//        console.log("Admin Module:: config");
    }])
    .run([function(){
//        console.log("Admin Module:: running");
    }])
    .controller('AdminCtrl',['$scope',function($scope){
        console.log("AdminCtrl from adminModule:: running");
                
        $scope.setItem = function(item){
            location.hash = item;
            location.reload;                      
        };
    }])
    .controller('entityCtrl',['$scope','entityService',function($scope, entityService){
        console.log("entityCtrl -1- from adminModule:: running");
                
        var entity = location.pathname.substring(1);
        switch (entity)
            {
                case "albums": { 
                    entityService.albums.get().then(function(data){ 
                        $scope.albums = data;
                    });           
                    break;
                }
                case "comments": { 
                    entityService.comments.get().then(function(data){ 
                        $scope.comments = data;
                    });           
                    break;
                }                    
                case "users": { 
                   entityService.users.get().then(function(data){ 
                        $scope.users = data;
                    });  
                    break;
                }                
                 
                default: break;
            }   
    }])
    .directive("navtmpl", function(){
       return {        
           templateUrl: 'partials/nav.html',        
            link: function($scope, element, attributes) {
            }
        }
    });
    
    
})(window.angular);