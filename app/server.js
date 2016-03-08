var http = require("http"); // module
var url = require("url"); // module 

function start(route, handle){    
    function onRequest(request, response) {
      var pathname = url.parse(request.url).pathname;
      var postData = "";
        
//      request.setEncoding("utf8");
//        
//      request.addListener("data", function(postDataChunk){
//          postData += postDataChunk;
//          console.log("Received POST data chunk '"+ postDataChunk + "'.");
//      });
//        
//      request.addListener("end", function() {
//        route(handle, pathname, response, postData);
//      });
      
      route(handle, pathname, response);        
      //response.write("content: test", function(error){ response.end();});                  
    }

    http.createServer(onRequest).listen(8888);    
    console.log("Server has started");
}

exports.start = start;