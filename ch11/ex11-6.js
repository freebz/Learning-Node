// 예제 11-6. 큐를 사용하여 SQL 문 실행 흐름을 제어

var mysql = require('mysql');
var queues = require('mysql-queues');

// 데이터베이스 연결
var client = mysql.createClient({
    user: 'username',  password: 'password'
});

client.query('USE databasenm');

// debug를 사용하여 큐와 쿼리를 연결

// 큐 생성
q = client.createQueue();

// 추가
q.query('INSERT INTO nodetest2 (title, text, created) ' +
	'values(?,?,NOW())',
	['Title for 8', 'Text for 8']);

// 업데이트
q.query('UPDATE nodetest2 SET title = ? WHERE title = ?',
	['New Title for 8', 'Title for 8']);

q.execute();

// 이전 쿼리들이 완료되기 전까지는 select가 일어나지 않음
client.query('SELECT * FROM nodetest2 ORDER BY ID', function(err, result, fields) {
    if (err) {
	console.log(err);
    } else {

	// 최신 레코드를 포함한 모든 레코드가 표시되어야 함
	console.log(result);
	client.end();
    }
});
