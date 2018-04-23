// 예제 9-4. 웹 로그 항목을 처리하고, 메시지 큐에 이미지 리소스 요청을 보내는 Node 애플리케이션

var spawn = require('child_process').spawn;
var net = require('net');

var client = new net.Socket();
client.setEncoding('utf8');

// TCP 서버에 연결
client.connect ('3000','examples.burningbird.net', function() {
    console.log('connected to server');
});
// 자식 프로세스 시작
var logs = spawn('tail', ['-f',
			  '/home/main/logs/access.log',
			  '/home/tech/logs/access.log',
			  '/home/shelleypowers/logs/access.log',
			  '/home/green/logs/access.log',
			  '/home/puppies/logs/access.log']);

// 자식 프로세스 데이터 처리
logs.stdout.setEncoding('utf8');
logs.stdout.on('data', function(data) {

    // 리소스 URL
    var re = /GET\s(\S+)\sHTTP/g;

    // 이미지 테스트
    var re2 = /\.gif|\.png|\.jpg|\.svg/;

    // URL을 추출하여 이미지인지 검사
    // 이미지가 발결되면 Redis에 저장
    var parts = re.exec(data);
    console.log(parts[1]);
    var tst = re2.test(parts[1]);
    if (tst) {
	client.write(parts[1]);
    }
});
logs.stderr.on('data', function(data) {
    console.log('stderr: ' + data);
});

logs.on('exit', function(code) {
    console.log('child preocess exited with code ' + code);
    client.end();
});
