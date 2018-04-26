// 예제 14-6. Redis 연결을 지속하지않도록 변경된 애플리케이션

var redis = require("redis"),
    http = require('http');
var scoreServer = http.createServer();

// 들어오는 요청을 수신
scoreServer.on('request', function (req, res) {

    console.time('test');

    // Redis 클라이언트 생성
    var client = redis.createClient();

    client.on('error', function (err) {
	console.log('Error ' + err);
    });

    // 데이터베이스를 1로 설정
    client.select(1);


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
	client.quit();
	console.timeEnd('test');
    });
});

scoreServer.listen(8124);

console.log('listening on 8124');
