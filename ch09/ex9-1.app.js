// 예제 9-1. Redis 데이터 저장소를 업데이트하는 TCP 서버

var net = require('net');
var redis = require('redis');

var server = net.createServer(function(conn) {
    console.log('connected');

    // Redis 클라이언트 생성
    var client = redis.createClient();

    client.on('error', function(err) {
	console.log('Error ' + err);
    });

    // 5번재 데이터베이스가 게임 점수 데이터베이스라고 가정
    client.select(5);
    conn.on('data', function(data) {
	console.log(data + ' from ' + conn.remoteAddress + ' ' +
		    conn.remotePOrt);
	try {
	    var obj = JSON.parse(data);

	    // 점수를 추가하거나 덮어씀
	    client.hset(obj.member, "first_name", obj.first_name, redis.print);
	    client.hset(obj.member, "last_name", obj.last_name, redis.print);
	    client.hset(obj.member, "score", obj.score, redis.print);
	    client.hset(obj.member, "date", obj.date, redis.print);

	    // Zowie! 게임에 대한 점수 추가
	    client.zadd("Zowie!", parseInt(obj.score), obj.member);
	} catch(err) {
	    console.log(err);
	}
    });
    conn.on('close', function() {
	console.log('client closed connection');
	client.quit();
    });

}).listen(8124);

console.log('listening on port 8124')
