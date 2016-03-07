var exec = require("child_process").exec;

function start(response){
    console.log("Request handler 'start' was called.");
   
    var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" method="post">'+
    '<textarea name="text" rows="20" cols="60"></textarea> <br>'+
    '<input type="submit" value="Submit text" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("Text for a main page");
    response.end();
}

function upload(response){
    console.log('Request handler "upload" was called.');
    //response.writeHead(200, {"Content-Type": "text/plain"});
    //response.write("You've sent: " + postData);
    response.write("You've sent: ");
    response.end();
}

exports.start = start;
exports.upload = upload;