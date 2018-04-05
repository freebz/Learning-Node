// 예제5-4. 예제 5-3의 애플리케이션을 비동기 중첩 콜백으로 변환

var fs = require('fs');

try {
    fs.readFile('.apples.txt','utf8', function(err,data) {

	if (err) throw err;
	
	var adjData = data.replace(/[A|a]pple/g,'orange');

	fs.writefile('.oranges.txt', adjData, function(err) {

	    if (err) throw err
	});
    });
} catch(err) {
    console.error(err);
}
