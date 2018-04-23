// 예제 9-8. 통계 애플리케이션에서 새로운 컨트롤러 코드를 가진 라우팅 색인 파일

var redis = require('redis');

// 홈 페이지
exports.index = function(req, res){
    res.render('index', { title: 'Express' });
};

// 통계
exports.stats = function(req, res){

    var client = redis.createClient();

    client.select(2);

    // 데이터를 취합하기 위한Redis 트랜잭션
    client.multi()
	.smembers('ip')
	.hgetall('myurls')
	.exec(function(err, results) {
	    var ips = results[0];
	    var urls = results[1];
	    res.render('stats',{ title: 'Stats', ips : ips, urls : urls});
	    client.quit();
	});
};
