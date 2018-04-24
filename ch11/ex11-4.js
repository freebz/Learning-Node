// 예제 11-4. 체인 메서드를 사용하여 새 레코드를 삽입한 후 업데이트

var mysql = require('db-mysql');

// 데이터 베이스 연결을 정의
var db = new mysql.Database({
    hostname: 'localhost',
    user: 'username',
    password: 'password',
    database: 'databasenm'
});

// 연결
db.connect();

db.on('error', function(error) {
    console.log("CONNECTION ERROR: " + error);
});

// 데이터베이스가 연결됨
db.on('ready', function(server) {

    // 직접 쿼리 문자열과 중첩 콜백을 사용하여 쿼리
    var qry = this.query();
    qry.insert('nodetest2',['title','text','created'],
	       ['Fourth Entry', 'Fourth entry in series', 'NOW()'])
	.execute(function(err,result) {
	    if (err) {
		console.log(err);
	    } else {
		console.log(result);

		var qry2 = db.query();
		qry2.update('nodetest2')
		    .set({title: 'Better title'})
		    .where('id = ?',[4])
		    .execute(function(err, result) {
			if(err) {
			    console.log(err);
			} else {
			    console.log(result);
			}
		    });
	    }
	});
});
