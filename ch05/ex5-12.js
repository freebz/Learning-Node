// 예제 5-12. 세 개의 파일을 병렬로 열고, 내용을 읽음

var fs = require('fs'),
    async = require('async');

try {
    async.parallel({
	data1 : function (callback) {
	    fs.readFile('./data/data1.txt', 'utf8', function(err, data){
		callback(err,data);
	    });
	},
	data2: function (callback) {
	    fs.readFile('./data/data2.txt', 'utf8', function(err, data){
		callback(err,data);
	    });
	},
	data3 : function readData3(callback) {
	    fs.readFile('./data/data3.txt', 'utf8', function(err, data){
		callback(err,data);
	    });
	},

    }, function (err, result) {
	if (err) throw err;
	console.log(result);
    });
} catch(err) {
    console.log(err);
}
