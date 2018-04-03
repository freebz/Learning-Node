// 예제 3-7. 8124 포트에 바인딩되어 이벤트를 수신 대기하는 UDP 소켓 서버

var dgram = require('dgram');

var server = dgram.createSocket("udp4");

server.on("message", function(msg, rinfo) {
    console.log("Message: " + msg + " from " + rinfo.address + ":"
		+ rinfo.port);
});

server.bind(8124);
