// 예제 3-6. 터미널에 입력된 메시지를 전송하는 데이터그램 클라이언트

var dgram = require('dgram');

var client = dgram.createSocket("udp4");

// 터미널로부터 입력을 준비
process.stdin.resume();

process.stdin.on('data', function (data) {
    console.log(data.toString('utf8'));
    client.send(data, 0, data.length, 8124, "examples.burningbird.net",
	function (err, bytes) {
	    if (err)
		console.log('error: ' + err);
	    else
		console.log('successful');
	});
});
