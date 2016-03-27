(function(angular){    
    angular.module('constModules', [])    
    .config([function(){
    }])
    .run([function(){
    }])
    .constant("PATH",{
        server : "http://localhost:3000/",        
        albums : "http://localhost:3000/albums",
        comments : "http://localhost:3000/comments",
        photos : "http://localhost:3000/photos",
        posts : "http://localhost:3000/posts",
        todos : "http://localhost:3000/todos",
        users : "http://localhost:3000/users"
    });
    
})(window.angular)