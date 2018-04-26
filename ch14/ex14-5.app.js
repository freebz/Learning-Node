// 예제 14-5. 지속적인 Redis 연결을 테스트하는 데 사용되는 간단한 Redis access 애플리케이션

var redis = require("redis"),
    http = require('http');

// Redis 클라이언트 생성
var client = redis.createClient();

client.on('error', function (err) {
    console.log('Error ' + err);
});

// 데이터베이스를 1로 설정
client.select(1);

var scoreServer = http.createServer();

// 들어오는 요청을 수신
scoreServer.on('request', function (req, res) {

    console.time('test');
    req.addListener("end", function() {
	var obj = {
	    member : 2366,
	    game : 'debiggame',
	    first_name : 'Sally',
	    last_name : 'Smith',
	    email : 'sally@smith.com',
	    score : 50000 };

	// 점수를 추가하거나 덮어씀
	client.hset(obj.member, "game", obj.game, redis.print);
	client.hset(obj.member, "first_name", obj.first_name, redis.print);
	client.hset(obj.member, "last_name", obj.last_name, redis.print);
	client.hset(obj.member, "email", obj.email, redis.print);
	client.hset(obj.member, "score", obj.score, redis.print);

	client.hvals(obj.member, function (err, replies) {
	    if (err) {
		return console.error("error response - " + err);
	    }

	    console.log(replies.length + " replies:");
	    replies.forEach(function (reply, i) {
		console.log("    " + i + ": " + reply);
	    });
	});

	res.end(obj.member + ' set score of ' + obj.score);
	console.timeEnd('test');
    });
});

scoreServer.listen(8124);

// HTTP 서버 및 클라이언트 연결을 닫음
scoreServer.on('close', function() {
    client.quit();
});

console.log('listening on 8124');
