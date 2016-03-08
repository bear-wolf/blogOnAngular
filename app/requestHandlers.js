//var exec = require("child_process").exec;
var querystring = require("querystring");

function start(response){       
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
    
    response.write(body, function(){ response.end(); });    
}

function upload(response, postData){    
    //var content = "You've sent: "+postData;    
    var content = "You've sent the text: " + querystring.parse(postData).text;
    response.write(content, function(){ response.end()});    
}

exports.start = start;
exports.upload = upload;