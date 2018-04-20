// 예제 7-2. 여러가지 라우팅 경로 패턴을 테스트해보기 위한 간단한 애플리케이션

var express = require('express')
  , http = require('http');
var app = express();

app.configure(function(){
});

app.get(/^\/node?(?:\/(\d+)(?:\.\.(\d+))?)?/, function(req, res){
    console.log(req.params);
    res.send(req.params);
});

app.get('/content/*',function(req,res) {
    res.send(req.params);
});

app.get("/products/:id/:operation?", function(req,res) {
    console.log(req);
    res.send(req.params.operation + ' ' + req.params.id);
});

http.createServer(app).listen(3000);

console.log("Express server listening on port 3000");
