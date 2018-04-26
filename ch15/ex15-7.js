// 예제 15-7. Node의 vm 모듈을 사용해서 스크립트를 샌드박스화하는 예제

var vm = require('vm');
var util = require('util');

var obj = { name: 'Shelley', domain: 'burningbird.net'};

// 스크립트 컴파일
var script_obj = vm.createScript("var str = 'My name is ' + name + ' at ' + domain",
				 'test.vm');

// 새로운 컨텍스트에서 실행
script_obj.runInNewContext(obj);

// snadbox 개체 조사
console.log(util.inspect(obj));
