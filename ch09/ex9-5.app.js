// 에제 9-5. 들어오는 메시지를 받아 Redis 목록에 push하는 메시지 큐

var net = require('net');
var redis = require('redis');

var server = net.createServer(function(conn) {
    console.log('connected');

    // Redis 클라이언트 생성
    var client = redis.createClient();

    client.on('error', function(err) {
	console.log('Error ' + err);
    });

    // 6번째 데이터베이스가 이미지 큐
    client.select(6);
    // 들어오는 데이터 수신대기
    conn.on('data', function(data) {
	console.log(data + ' from ' + conn.remoteAddress + ' ' +
		    conn.remotePort);
	// 데이터 저장
	client.rpush('images',data);
    });
}).listen(3000);
server.on('close', function(err) {
    client.quit();
});

console.log('listening on port 3000');
