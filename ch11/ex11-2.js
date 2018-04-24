// 예제 11-2. 쿼리 문자열에서 플레잇 홀더 사용

var mysql = require('db-mysql');

// 데이터베이스 연결을 정의
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

    // 직접 쿼리 문자열과 이벤트를 사용하여 쿼리
    var qry = this.query();
    qry.execute('insert into nodetest2 (title, text, created) values(?,?,NOW())',
		['Third Entry', 'Third entry in series']);

    qry.on('success', function(result) {
	console.log(result);
    });

    qry.on('error', function(error) {
	console.log('Error: ' + error);
    });
});
