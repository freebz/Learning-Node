// 예제 15-1. 매우 간단한 HTTPS 서버 만들기

var fs = require("fs"),
    https = require("https");

var privateKey = fs.readFileSync('site.key').toString();
var certificate = fs.readFileSync('final.crt').toString();

var options = {
    key: privateKey,
    cert: certificate
};

https.createServer(options, function(req,res) {
    res.writeHead(200);
    res.end("Hello Secure World\n");
}).listen(443);
