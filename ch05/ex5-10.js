// 예제 5-10. 파일의 내용을 비동기로 읽고, 수정하고, 쓰기 위해 async.waterfall을 사용

var fs = require('fs'),
    async = require('async');

try {
    async.waterfall([
	function readData(callback) {
	    fs.readFile('./data/data1.txt', 'utf8', function(err, data){
		callback(err,data);
	    });
	},
	function modify(text, callback) {
	    var adjdata=text.replace(/somecompany\.com/g,'burningbird.net');
	    callback(null, adjdata);
	},
	function writeData(text, callback) {
	    fs.writeFile('./data/data1.txt', text, function(err) {
		callback(err,text);
	    });
	}
    ], function (err, result) {
	if (err) throw err;
	console.log(result);
    });
} catch(err) {
    console.log(err);
}
