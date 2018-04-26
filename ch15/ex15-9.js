// 예제 15-9. vm에 전달된 context 개체로 컨텍스트 내에서 코드 실행하기

var vm = require('vm');
var util = require('util');
var fs = require('fs');

fs.readFile('suspicious.js', 'utf8', function(err, data) {
    if (err) return console.log(err);

    try {

	var obj = { name: 'Shelley', domain: 'burningbird.net'};

	// 스크립트 컴파일
	var script_obj = vm.createScript(data, 'test.vm');

	// 컨텍스트 생성
	var ctx = vm.createContext(obj);
	
	// 새로운 컨텍스트에서 실행
	script_obj.runInContext(ctx);

	// 개체 조사
	console.log(util.inspect(obj));

	// 컨텍스트 조사
	console.log(util.inspect(ctx));
	
    } catch(e) {
	console.log(e);
    }
});
