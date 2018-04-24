// 예제 11-5. node-mysql을 사용한 CRUD 데모

var mysql = require('mysql');

var client = mysql.createClient({
    user: 'username',
    password: 'password'
});

client.query('USE databasenm');

// 생성
client.query('INSERT INTO nodetest2 ' +
    'SET title = ?, text = ?, created = NOW()',
    ['A seventh item', 'This is a seventh item'], function(err, result) {
    if (err) {
	console.log(err);
    } else {
	var id = result.insertId;
	console.log(result.insertId);

	// 업데이트
	client.query('UPDATE nodetest2 SET ' +
	    'title = ? WHERE ID = ?', ['New title', id], function (err, result) {
	    if (err) {
		console.log(err);
	    } else {
		console.log(result.affectedRows);
		// 삭제
		client.query('DELETE FROM nodetest2 WHERE id = ?',
		  [id], function(err, result) {
		  if(err) {
		      console.log(err);
		  } else {

		      console.log(result.affetedRows);

		      // 중첩 콜백 대신 명명된 함수를 사용
		      getData();
		  }
	        });
	    }
	});
    }
});

// 데이터를 가져옴
function getData() {
    client.query('SELECT * FROM nodetest2 ORDER BY id', function(err, result,fields) {
	if(err) {

	    console.log(err);
	} else {
	    console.log(result);
	    console.log(fields);
	}
	client.end();
    });
}
