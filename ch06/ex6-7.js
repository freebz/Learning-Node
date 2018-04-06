// 예제 6-7. 세션 쿠키를 사용하여 리소스 접근을 추적

var connect = require('connect')
  , http = require('http');

// 모든 세션 데이터를 지움
function clearSession(req, res, next) {
    if ('/clear' == req.url) {
	req.session = null;
	res.statusCode = 302;
	res.setHeader('Location', '/');
	res.end();
    } else {
	next();
    }
}

// 사용자 추적
function trackUser(req, res, next) {
    req.session.ct = req.session.ct || 0;
    req.session.username = req.session.username || req.cookies.username;
    console.log(req.cookies.username + ' requested ' +
		req.session.ct++ + ' resources this session');
    next();
}

// 쿠키 및 세션
var app = connect()
    .use(connect.logger('dev'))
    .use(connect.cookieParser('mumble'))
    .use(connect.cookieSession({key : 'tracking'}))   .use(clearSession)
    .use(trackUser);

// 정적 서버
app.use(connect.static('/home/examples/public_html'));
// 서버를 시작하고 수신 대기
http.createServer(app).listen(8124);
console.log('Server listening on port 8124');
