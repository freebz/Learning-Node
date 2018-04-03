// 예제 3-3. TCP 서버로 데이터를 전송하는 클라이언트 소켓

var net = require('net');

var client = new net.Socket();
client.setEncoding('utf8');

// 서버로 연결
client.connect ('8124','localhost', function () {
    console.log('connected to server');
    client.write('Who needs a borwser to communicate?');
});

// 터미널로부터 입력을 준비
process.stdin.resume();

// 데이터를 입력 받으면 서버로 전송
process.stdin.on('data', function (data) {
    client.write(data);
});

// 데이터를 수신하면 콘솔로 출력
client.on('data',function(data) {
    console.log(data); });

// 서버가 닫히는 경우
client.on('close',function() {
    console.log('connection is closed');
});
