// 예제 3-9. "test"라는 검색어로 하위 디렉터리에서 파일을 찾기 위해 자식 프로세스를 사용

var spawn = require('child_process').spawn,
    find = spawn('find',['.','-ls']),
    grep = spawn('grep',['test']);

grep.stdout.setEncoding('utf8');

// 찾은 결과를 grep으로 전달
find.stdout.on('data', function(data) {
    grep.stdin.write(data);
});

// 양쪽에 대한 오류 처리
find.stderr.on('data', function (data) {
    console.log('grep stderr: ' + data);
});
grep.stderr.on('data', function (data) {
    console.log('grep stderr: ' + data);
});

// 양쪽에 대한 종료 처리
find.on('exit', function (code) {
    if (code !== 0) {
	console.log('find process exited with code ' + code);
    }

    // grep 프로세스도 종료시킴
    grep.stdin.end();
});

grep.on('exit', function (code) {
    if (code !== 0) {
	console.log('grep process exited with code ' + code);
    }
});
