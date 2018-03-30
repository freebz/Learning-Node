// 예제 2-1. 모듈을 사전 로드하는 사용자 정의 REPL 만들기

var repl = require('repl');
var context = repl.start(">>", null, null, null, true).context;

// 모듈드를 사전에 로드
context.http = require('http');
context.util = require('util');
context.os = require('os');
