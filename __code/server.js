var http = require("http"); // module
var url = require("url"); // module 


function start(route, handle){    
    function onRequest(request, response) {
      console.log("onRequest()");
      var pathname = url.parse(request.url).pathname;        
      route(handle, pathname, response, request);      
    }            

    http.createServer(onRequest).listen(8888, function(){ console.log("listening...")});    
    console.log("Server has started on the port #8888");
}

//function loadFiles(req, res){
//    if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
//    // parse a file upload
//    var form = new formidable.IncomingForm();
//    form.parse(req, function(err, fields, files) {
//      res.writeHead(200, {'content-type': 'text/plain'});
//      res.write('received upload:\n\n');
//      res.end(sys.inspect({fields: fields, files: files}));
//    });
//    return;
//  }
//
//  // show a file upload form
//  res.writeHead(200, {'content-type': 'text/html'});
//  res.end(
//    '<form action="/upload" enctype="multipart/form-data" '+
//    'method="post">'+
//    '<input type="text" name="title"><br>'+
//    '<input type="file" name="upload" multiple="multiple"><br>'+
//    '<input type="submit" value="Upload">'+
//    '</form>'
//  );
//}

exports.start = start;