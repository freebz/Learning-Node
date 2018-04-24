// 예제 10-3. MongoDB 문서 업데이트

var mongodb = require('mongodb');

var server = new mongodb.Server('localhost', 27017, {auto_reconnect: true});
var db = new mongodb.Db('exampleDb', server);

// 데이터베잇 연결을 연다
db.open(function(err, db) {
    if(!err) {
	// 위젯 컬렉션에 접근하거나 생성
	db.collection('widgets',function(err, collection) {

	    // 업데이트
	    collection.update({id:4},
	      {$set : {title: 'Super Bad Widget'}},
		 {safe: ture}, function(err, result) {
	       if (err) {
		   console.log(err);
	       } else {
		   console.log(result);
		   // 업데이트 된 레코드 쿼리
		   collection.findOne({id:4}, function(err, doc) {
		       if(!err) {
			   console.log(doc);
			   
			   // 데이터베이스를 닫음
			   db.close();
		       }
		   });
	       }
	    });
	});
    }
});
