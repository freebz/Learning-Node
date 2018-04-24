// 예제 11-7. 트랜잭션을 사용하여 SQL 업데이트를 제어

var mysql = require('mysql');
var queues = require('mysql-queues');

// 데이터베이스에 연결
var client = mysql.createClient({
    user: 'username',
    password: 'password'
});

client.query('USE databasenm');

// debug를 사용하여 큐와 쿼리를 연결
queues(client, true);

// 트랜잭션 생성
var trans = client.startTransaction();
// 추가
trans.query('INSERT INTO nodetest2 (title, text, created) ' +
	    'values(?,?,NOW())',
	    ['Title for 8', 'Text for 8'], function(err,info) {

    if (err) {
	trans.rollback();
    } else {
	console.log(info);

	// 업데이트
	trans.query('UPDATE nodetest2 SET title = ? WHERE title =?',
		    ['Better Title for 8','Title for 8'], function(err,info) {
	    if(err) {
		trans.rollback();
	    } else {
		console.log(info);
		trans.commit();
	    }
	});
    }
});
trans.execute();

// 트랜잭션이 완료될 때까지 select가 수행되지 않음
client.query('SELECT * FROM nodetest2 ORDER BY ID', function(err, result, fields) {
    if (err) {
	console.log(err);
    } else {

	// 최신 레코드를 포함한 모든 레코드가 표시되어야 함
	console.log(result);
	client.end();
    }
});
