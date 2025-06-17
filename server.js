var express = require('express');
var bodyParser = require("body-parser");
var exec = require('child_process').exec;

var server = express();
server.use(bodyParser.urlencoded({ extended: true }));
server.listen(3000);
  
server.get('/lookup.html', function(request, response) {
  response.sendFile( __dirname  + '/lookup.html');
});
  
server.post('/post.html', function(request, response) {
  var host = request.body.lookup; 
  console.log(`Host : ${host}`);
  exec("nslookup " + host, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    response.setHeader('Content-Type', 'text/html');
    response.writeHead(200);
    response.end("<html><body><h1>" + stdout + "!</h1></body></html>");
  });  
});
