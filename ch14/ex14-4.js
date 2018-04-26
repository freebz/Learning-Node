// 예제 14-4. Zombie로 로그인 폼 테스트

var Browser = require('zombie');
var assert = require('assert');

var browser = new Browser();

browser.visit('http://examples.burningbird.net:3000/login', function() {
    browser.
	fill('username', 'Sally').
	fill('password', 'apple').
	pressButton('Submit', function() {
	    assert.equal(browser.location.pathname, '/admin');
	});
});
