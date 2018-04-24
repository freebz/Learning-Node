// 예제 10-2. 4개의 문서를 삽입한 후, find 메서드를 사용하게 가져온다

var mongodb = require('mongodb');

var server = new mongodb.Server('localhost', 27017, {auto_reconnect: true});
var db = new mongodb.Db('exampleDb', server);

// 데이터베이스 연결을 연단
db.open(function(err, db) {
    if(!err) {

	// 위젯 컬렉션에 접근하거나 생성
	db.collection('widgets', function(err, collection) {

	    // 모든 위젯 문서를 제거
	    collection.remove(null,{safe : true}, function(err, result) {
		if (!err) {
		    // 레코드 4개 생성
		    var widget1 = {id: 1, title : 'First Great widget',
				   desc : 'greatest widget of all',
				   price : 14.99, type: 'A'};

		    var widget2 = {id: 2, title : 'Second Great widget',
				   desc : 'second greatest widget of all',
				   price : 29.99, type: 'A'};
		    var widget3 = {id: 3, title: 'third widget', desc: 'third widget',
				   price : 45.00, type: 'B'};
		    var widget4 = {id: 4, title: 'fourth widget', desc: 'forth widget',
				   price: 60.00, type: 'B'};
		    collection.insert([widget1,widget2,widget3,widget4], {safe : true},
				      function(err, result) {
		        if(err) {
			    console.log(err);
			} else {

			    // 모든 문서 반환
			    collection.find().toArray(function(err, docs) {
				console.log(docs);

				// 데이터베이스를 닫음
				db.close();
			    });
			}
		    });
		}
	    });
	});
    }
});
