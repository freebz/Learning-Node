// 예제 6-6. HTTP 요청 쿠키에 접근하여 쿠키 값을 콘솔 메시지에 사용

var connect = require('connect')
  , http = require('http');
var app = connect()
    .use(connect.logger('dev'))
    .use(connect.cookieParser())
    .use(function(req, res, next) {
	console.log('tracking ' + req.cookies.username);
	next();
    })
    .use(connect.static('/home/examples/public_html'));

http.createServer(app).listen(8124);
console.log('Server listening on port 8124');
