// 예제 15-2. 비밀번호를 암호화하기 위해 Crypto의 createHash 메서드와 salt를 사용

var mysql = require('mysql'),
    crypto = require('crypto');

var client = mysql.createClient({
    user: 'username',
    password: 'password'
});

client.query('USE databasenm');

var username = process.argv[2];
var password = process.argv[3];

var salt = Math.round((new Date().valueOf() * Math.random())) + '';

var hashpassword = crypto.createHash('sha512')
    .update(salt + password)
    .digest('hex');
// 사용자 레코드 생성
client.query('INSERT INTO user ' +
    'SET username =?, password = ?, salt = ?',
    [username, hashpassword, salt], function(err, result) {
	if (err) console.log(err);
	client.end();
});
