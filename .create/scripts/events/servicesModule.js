(function(angular){
    
    var url = "http://localhost:3000/";
    
    angular.module('servicesModule',['ngResource'])
    .config([function(){
        console.log("Service Module:: config");
    }])
    .run([function(){
        console.log("Service Module:: running");
    }])
    .service('UserService',['$resource', function($resource){       
        this.get = function(){
             return $resource(url+'users/:Id.json', {}, {
                query: {
                    method:'GET', 
                    //params:{ phoneId:'phones' },
                    isArray:true
                   }
            }); 
        }
    }]);
    
})(window.angular);
