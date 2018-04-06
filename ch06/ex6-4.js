// 예제 6-4. Connect에 번들된 미들웨어를 애플리케이션에 직접 포함시킴

var connect = require('connect');
var http = require('http');

http.createServer(connect()
    .use(connect.favicon())
    .use(connect.logger())
    .use(function(req,res) {
	res.end('Hello World\n');
    })).listen(8124);
