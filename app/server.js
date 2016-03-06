var http = require("http"); // module
var url = require("url"); // module 

function start(route, handle){    
    function onRequest(request, response) {
      var pathname = url.parse(request.url).pathname;
              
      response.writeHead(200, {"Content-Type": "text/plain"});
      route(handle, pathname, response);
//      var content = route(handle, pathname, response);        
//      response.write(content);      
//      response.end();
    }

    http.createServer(onRequest).listen(8888);    
    console.log("Server has started");
}

exports.start = start;