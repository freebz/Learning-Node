// 예제 12-1. wkhtmltopdf를 래핑한 간단한 Node 애플리케이션

var    spawn = require('child_process').spawn;

// 명령줄 인수
var url = process.argv[2];
var output = process.argv[3];

if (url && output) {

    var wkhtmltopdf = spawn('wkhtmltopdf.sh', [url, output]);

    wkhtmltopdf.stdout.setEncoding('utf8');
    wkhtmltopdf.stdout.on('data', function (data) {
	console.log(data);
    });

    wkhtmltopdf.stderr.on('data', function (data) {
	console.log('stderr: ' + data);
    });

    wkhtmltopdf.on('exit', function (code) {
	console.log('child process exited with code ' + code);
    });
} else {
    console.log('You need to provide a URL and output file name');
}
