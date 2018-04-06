// 예제 6-11. 라우팅 처리기를 지정된 라우팅 경로에 매핑
var crossroads = require('crossroads'),
    http = require('http');

var typeRoute = crossroads.addRoute('/{type}/{id}');

function onTypeAccess(type,id) {
    console.log('access ' + type + ' ' + id);
};

typeRoute.matched.add(onTypeAccess);

http.createServer(function(req,res) {

    crossroads.parse(req.url);
    res.end('processing');
}).listen(8124);
