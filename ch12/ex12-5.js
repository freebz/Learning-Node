// 예제 12-5. 자식 프로세스를 사용하여 ImageMagick 변환 도구로 이미지 배율을 조정하는 Node 애플리케이션

var spawn = require('child_process').spawn;

// 사진을 가져옴
var photo = process.argv[2];

// 배열로 변환
var opts = [
    photo,
    '-resize',
    '150',
    photo + ".png"];

// 변환
var im = spawn('convert', opts);

im.stderr.on('data', function (data) {
    console.log('stderr: ' + data);
});

im.on('exit', function (code) {
    if (code === 0)
	console.log('photo has been converted and is accessible at '
		    + photo + '.png');
});
