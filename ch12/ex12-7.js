// 예제 12-7. 범위를 지원하는 미니 웹 서버

var http = require('http'),
    url =  require('url'),
    fs   = require('fs'),
    mime = require('mime');

function processRange(res,ranges,len) {

    var start, end;
    // 시작 및 종료 범위를 추출
    var rangearray = ranges.split('-');

    start =  parseInt(rangearray[0].substr(6));
    end = parseInt(rangearray[1]);

    if (isNaN(start)) start = 0;
    if (isNaN(end)) end = len -1;

    // 시작이 파일 길이를 넘어가는 경우
    if (start > len - 1) {
	res.setHeader('Content-Range', 'bytes */' + len);
	res.writeHead(416);
	res.end();
    }

    // 종료는 파일 길이를 넘어갈 수 없음
    if (end > len - 1)
	end = len -1;

    return {start:start, end:end};
}
http.createServer(function (req, res) {

    pathname = __dirname + '/public' + req.url;

    fs.stat(pathname, function(err, stats) {
	if (err) {
	    res.writeHead(404);
	    res.write('Bad request 404\n');
	    res.end();
	} else if (stats.isFile()) {
	    var opt={};

	    // 범위가 아니라고 가정
	    res.statusCode = 200;

	    var len = tats.size;

	    // 범위 요청일 경우
	    if (req.headers.range) {
		opt = processRange(res,req.headers.range,len);

		// 길이를 조정
		len = opt.end - opt.start + 1;

		// change status code to partial
		res.statusCode = 206;

		// 헤더 설정
		var ctstr = 'bytes ' + opt.start + '-' +
		    opt.end + '/' + stats.size;

		res.setHeader('Content-Range', ctstr);
	    }
	    console.log('len ' + len);
	    res.setHeader('Content-Length', len);

	    // 컨텐츠 형식
	    var type = mime.lookup(pathname);
	    res.setHeader('Content-Type', type);
	    res.setHeader('Accept-Ranges', 'bytes');

	    // 읽기 가능한 스트림을 생성 후 파이프
	    var file = fs.createReadStream(pathname,opt);
	    file.on("open", function() {

		file.pipe(res);
	    });
	    file.on("error", function(err) {
		console.log(err);
	    });

	} else {
	    res.writeHead(403);
	    res.write('Directory access is forbidden');
	    res.end();
	}
    });
}).listen(8124);
console.log('Server running at 8124/');
