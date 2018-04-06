// 예제 6-3. Connect 기반 애플리케이션에 logger 및 favicon 미들웨어를 결합

var connect = require('connect');
var http = require('http');

var app = connect()
    .use(connect.favicon())
    .use(connect.logger())
    .use(function(req,res) {
	res.end('Hello World\n');
    });

http.createServer(app).listen(8124);
