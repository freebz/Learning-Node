// 예제 11-3. 중첩 콜백을 사용하여 레코드 삽입, 업데이트, 삭제

var mysql = require('db-mysql');

// 데이터베이스 연결을 정의
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

    qry.execute('insert into nodetest2 (title, text,created) values(?,?,NOW())',
		['Fourth Entry','Fourth entry in series'], function(err,result) {
	if (err) {
	    console.log(err);
	} else {
	    console.log(result);

	    var qry2 = db.query();
	    qry2.execute('update nodetest2 set title = ? where id = ?',
			 ['Better title',4], function(err,result) {
		if(err) {
		    console.log(err);
		} else {
		    console.log(result);
		    var qry3 = db.query();
		    qry3.execute('delete from nodetest2 where id = ?',[4],
				 function(err, result) {
			if(err) {
			    console.log(err);
			} else {
			    console.log(result);
			}
		    });
		}
	    });
	}
    });
});
