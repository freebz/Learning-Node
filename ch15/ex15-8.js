// 예제 15-8. 파일로부터 스크립트를 읽어 vm에서 샌드박스화하도록 수정한 코드

var vm = require('vm');
var util = require('util');
var fs = require('fs');

fs.readFile('suspicious.js', 'utf8', function(err, data) {
    if (err) return console.log(err);

    try {
	console.log(data);
	var obj = { name: 'Shelley', domain: 'burningbird.net'};

	// 스크립트 컴파일
	var script_obj = vm.createScript(data, 'test.vm');

	// 새로운 컨텍스트에서 실행
	script_obj.runInNewContext(obj);

	// snadbox 개체 조사
	console.log(util.inspect(obj));
    } catch(e) {
	console.log(e);
    }
});
