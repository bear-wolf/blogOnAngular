//var exec = require("child_process").exec;
//var querystring = require("querystring");
var formidable = require("formidable");
var fs = require("fs");
//var sys = require('sys');

var globalFile = {
    path: "d:/Solutions/Projects/blogOnAngular/tmp/",
    name: null
};

function start(response){           
     var body = '<html>'+
	'<head>'+
	'<meta http-equiv="Content-Type" '+
	'content="text/html; charset=UTF-8" />'+
	'</head>'+
	'<body>'+
	'<form action="/upload" enctype="multipart/form-data" '+
	'method="post">'+
	'<input type="file" name="upload" multiple="multiple">'+
	'<input type="submit" value="Upload file" />'+
	'</form>'+
	'</body>'+
	'</html>';
    
    response.write(body, function(){ response.end(); });    
}

function upload(response, request){        
     var form = new formidable.IncomingForm();     
     console.log("about to parse");
     
     form.parse(request, function(error, fields, files) {                          
         
        fs.createReadStream(files.upload.path).pipe(fs.createWriteStream(globalFile.path+files.upload.name));
        globalFile.name = files.upload.name;
         
        /* Возможна ошибка в Windows: попытка переименования уже существующего файла */         
//        fs.rename(files.upload.path, pathToPhotos+"test.png", function(err) {
//          console.log("rename = "+ err);            
////          if (err) {
////            fs.unlink(pathToPhotos+"test.png");
////            fs.rename(files.upload.path, pathToPhotos+"test.png");
////          }
//        });
         console.log("parsing done");         
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("received image:<br/>");
        response.write("<img src='/show' />",function(){ response.end()});
      });
}

function show(response, request, postData) {
    
  console.log("Request handler 'show' was called.");
  fs.readFile(globalFile.path+globalFile.name, "binary", function(error, file) {
    if(error) {
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n",function(){ response.end();});      
    } else {
      response.writeHead(200, {"Content-Type": "image/png"});
      response.write(file, "binary");
      response.end();
    }
  });
}
exports.start = start;
exports.upload = upload;
exports.show = show;