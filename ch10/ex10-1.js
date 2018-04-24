// 예제 10-1. 데이터베이스를 생성하거나 열고, 모든 문서를 삭제하고 두 개의 새로운 문서를 추가

var mongodb = require('mongodb');

var server = new mongodb.Server('localhost', 27017, {auto_reconnect: true});
var db = new mongodb.Db('exampleDb', server);

// 데이터베이스 연결을 한다
db.open(function(err, db) {
    if(!err) {

	// 위젯 컬렉션에 접근 또는 생성
	db.collection('widgets', function(err, collection) {

	    // 모든 위젯 문서를 삭제
	    collection.remove(null,{safe : true}, function(err, result) {
		if (!err) {
		    console.log('result of remove ' + result);

		    // 레코드 2개 생성
		    var widget1 = {title : 'First Great widget',
				   desc : 'greatest widget of all',
				   price : 14.99};
		    var widget2 = {title : 'Second Great widget',
				   desc : 'second greatest widget of all',
				   price : 29.99};

		    collection.insert(widget1);
		    collection.insert(widget2, {safe : true}, function(err, result) {
			if(err) {
			    console.log(err);
			} else {
			    console.log(result);

			    // 데이터베이스를 닫음
			    db.close();
			}
		    });
		}
	    });
	});
    }
});
