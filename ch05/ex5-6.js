// 예제 5-6. 각 디렉터리 개체가 파일인지 확인하기 위해 stats를 추가

var fs = require('fs');

var writeStream = fs.createWriteStream('./log.txt',
      {'flags' : 'a',
       'encoding' : 'utf8',
       'mode' : 0666});

try {
    // 파일 목록을 가져옴
    fs.readdir('./data/', function(err, files) {

	// 각 파일에 대해
	files.forEach(function(name) {

	    // 개체가 파일인지 확인
	    fs.stat('./data/' + name, function(err, stats) {

		if (err) throw err;

		if (stats.isFile())
		    // 내용 수정
		    fs.readFile('./data/' + name,'utf8',function(err,data) {

			if (err) throw err;
			var adjData = data.replace(/somecompany\.com/g,'burningbird.net');

			// 파일에 기록
			fs.writeFile('./data/' + name, adjData, function(err) {

			    if (err) throw err;
			    // 로그 기록
			    writeStream.write('changed ' + name + '\n', 'utf8',
				function(err) {
				    
				    if(err) throw err;
				});
			});
		    });
	    });
	});
    });
} catch(err) {
    console.error(err);
}
