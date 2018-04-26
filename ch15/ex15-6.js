// 예제 15-6. node-validator의 메서드들을 검증

var check = require('validator').check,
    sanitize = require('validator').sanitize;

var email = 'shelleyp@burningbird.net';
var email2 = 'this is a test';

var str = '<SCRIPT SRC=http://ha.ckers.org/xss.js></SCRIPT>';
try {
    check(email).isEmail()
    check(email2).isEmail();
} catch (err) {
    console.log(err.message);
}

var newstr = sanitize(str).xss();
console.log(newstr);
