// 예제 8-1. 데이터와 EJS 템플릿으로 HTML 생성

var   http = require('http')
    , ejs = require('ejs')
;

// http 서버 생성
http.createServer(function (req, res) {

    res.writeHead(200, {'content-type': 'text/html'});

    // 렌더링할 데이터
    var names = ['Joe', 'Mary', 'Sue', 'Mark'];
    var title = 'Testing EJS';

    // 렌더링 혹은 에러
    ejs.renderFile(__dirname + '/views/test.ejs',
		   {title : 'testing', names : names},
		     function(err, result) {
        if (!err) {
	    res.end(result);
	} else {
	    res.end('An error occured accessing page');
	    console.log(err);
	}
    });

}).listen(8124);

console.log('Server running on 8124/');
