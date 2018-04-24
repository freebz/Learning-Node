// 예제 11-1. 두 가지 다른 쿼리 스타일을 보여주는 db-mysql의 유연성에 대한 데모

var mysql = require('db-mysql');

// 데이터베이스 연결 정의
var db = new mysql.Database({
    hostname: 'localhost',
    user: 'username',
    password: 'userpass',
    database: 'databasenm'
});
// 연결
db.connect();

db.on('error', function(error) {
    console.log("CONNECTION ERROR: " + error);
});

// 데이터베이스가 연결됨
db.on('ready', function(server) {

    // 체인화된 메서드와 중첩 콜백을 사용하여 쿼리
    this.query()
	.select('*')
	.from('nodetest2')
	.where('id = 1')
	.execute(function(error, rows, columns) {
	    if (error) {
		return console.log('ERROR: ' + error);
	    }
	    console.log(rows);
	    console.log(columns);
	});

    // 직접 쿼리 문자열과 이벤트를 사용하여 쿼리
    var qry = this.query();

    qry.execute('select * from nodetest2 where id = 1');

    qry.on('success', function(rows, columns) {
	if (error) {
	    return console.log('ERROR: ' + error);
	}
	console.log(rows);
	console.log(columns);
    });

    // 직접 쿼리 문자열과 이벤트를 사용하여 쿼리
    var qry = this.query();

    qry.execute('select * from nodetest2 where id = 1');

    qry.on('success', function(rows, columns) {
	console.log(rows); // print out returned rows
	console.log(columns); // print out returns columns
    });
    qry.on('error', function(error) {
	console.log('Error: ' + error);
    });
});
