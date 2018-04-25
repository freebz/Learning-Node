// 예제 13-3. 개별 소켓에 저장되는 데이터를 사용하도록 수정된 서버 코드

var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

app.listen(8124);

function handler (req, res) {
    fs.readFile(__dirname + '/index.html',
    function (err, data) {
	if (err) {
	    res.writeHead(500);
	    return res.end('Error loading index.html');
	}
	counter = 1;
	res.writeHead(200);
	res.end(data);
    });
}

io.sockets.on('connection', function (socket) {
    socket.counter = 1;
    socket.emit('news', { news: 'Counting...' });
    
    socket.on('echo', function (data) {
	if (socket.counter <= 50) {
	    data.back+=socket.counter;
	    socket.counter++;
	    socket.emit('news', {news: data.back});
	}
    });
});
