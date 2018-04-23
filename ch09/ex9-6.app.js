// 예제 9-6. Redis 목록에서 메시지를 꺼내 사용자에게 반환하는 HTTP 서버

var redis = require("redis"),
    http = require('http');

var messageServer = http.createServer();

// 들어오는 요청을 수신 대기
messageServer.on('request', function (req, res) {

    // 먼저 아이콘 요청을 필터링
    if (req.url === '/favicon.ico') {
	res.writeHead(200, {'Content-Type': 'image/x-icon'} );
	res.end();
	return;
    }

    // Redis 클라이언트 생성
    var client = redis.createClient();


    client.on('error', function (err) {
	console.log('Error ' + err);
    });

    // 데이터베이스를 6으로 설정
    client.select(6);

    client.lpop('images', function(err, reply) {
	if(err) {
	    return console.error('error response ' + err);
	}

	// 데이터가 있으면
	if (reply) {
	    res.write(reply + '\n');
	} else {
	    res.write('End of queue\n');
	}
	res.end();
    });
    client.quit();

});
messageServer.listen(8124);

console.log('listening on 8124')
