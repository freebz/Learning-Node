// 예제 3-10. Windows에서 자식 프로세스 애플리케이션 실행

var cmd = require('child_process').spawn('cmd', ['/c', 'dir\n']);

cmd.stdout.on('data', function (data) {
    console.log('stdout: ' + data);
});

cmd.stderr.on('data', function (data) {
    console.log('stderr: ' = data);
});

cmd.on('exit', function (code) {
    console.log('child process exited with code ' + code);
});
