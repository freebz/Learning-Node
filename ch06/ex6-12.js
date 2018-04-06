// 예제 6-12. 동적 및 정적 컨텐츠 요청을 처리하기 위해 Connect, Crossroads, http-proxy을 조합

var connect = require('connect'),
    http = require('http'),
    fs = require('fs'),
    crossroads = require('crossroads'),
    httpProxy = require('http-proxy'),
    base = '/home/examples/public_html';

// 모든 요청을 수신 대기하는 프록시 생성
httpProxy.createServer(function(req,res,proxy) {

    if (req.url.match(/^\/node\//))
	proxy.proxyRequest(req, res, {
	    host: 'localhost',
	    port: 8000
	});
    else
	proxy.proxyRequest(req,res, {
	    host: 'localhost',
	    port: 8124
	});
}).listen(9000);

// 동적 리소스에 대한 요청을 위한 라우팅 경로 추가
crossroads.addRoute('/node/{id}/', function(id) {
    console.log('accessed node ' + id);
});

// 동적 파일 서버
http.createServer(function(req,res) {
    crossroads.parse(req.url);
    res.end('that\'s all!');
}).listen(8000);

// 정적 파일 서버
http.createServer(connect()
  .use(connect.favicon())
  .use(connect.logger('dev'))
  .use(connect.static(base))
).listen(8124);
