function route(handle, pathname, response, request){            
    if (typeof handle[pathname] === 'function')
        {
            console.log("Url:" + pathname + " Status 200");                
            response.writeHead(200, {"Content-Type": "text/html"});
            handle[pathname](response, request);                        
        } else
            {
                console.log("Url:" + pathname + " Not found. Status 404");                
                response.writeHead(404, {"Content-Type": "text/plain"});
                response.write("404 Not found", function(){ response.end(); });
            }
}

exports.route = route;