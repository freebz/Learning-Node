// 예제 12-4. PDF 파일을 처리한 후 처리된 파일의 위치를 사용자에게 메일로 전송하는 모듈

var fs = require('fs');
var spawn = require('child_process').spawn;
var emailjs = require('emailjs');

module.exports.processFile = function(username, email, path, filename) {

    // 먼저, 사용자 디렉터리가 존재하지 않으면 생성한다.
    fs.mkdir(__dirname + '/public/users/' + username, function(err) {

	// 다음으로, 파일 디렉터리가 존재하지 않으면 생성한다
	var dt = Date.now();

	// 이후 메시지를 위한 url
	var url = 'http://examples.burningbird.net:8124/users/' +
	    username + '/' + dt + filename;

	// 파일 디렉터리
	var dir = __dirname + '/public/users/' + username + '/' +
	    dt + filename;

	fs.make(dir, function(err) {
	    if (err)
		return console.log(err);
	    // 이제 새 위치로 파일의 이름을 변경

	    var newfile = dir + '/' + filename;

	    fs.rename(path, newfile, function(err) {
		if (err)
		    return console.log(err);

		// pdf 분할
		var pdftk = spawn('pdftk', [newfile, 'burst', 'output',
					    dir + '/page_%02d.pdf' ]);
		
		pdftk.on('exit', function (code) {
		    console.log('child precess ended with ' + code);
		    if (code != 0)
			return;

		    console.log('sending email');
		    // 이메일 전송

		    var server = emailjs.server.connect({
			user : 'gmail.account.name',
			password : 'gmail.account.password',
			host : 'smtp.gmail.com',
			port : 587,
			tls : true
		    });

		    var headers = {
			text : 'You can find your split PDF at ' + url,
			from : 'youremail',
			to : email,
			subject: 'split pdf'
		    };

		    var message = emailjs.message.create(headers);

		    message.attach({data:"<p>You can find your split PDF at " +
				    "<a href='" + url + "'>" + url + "</a></p>",
				    alternative: true});

		    server.send(message, function(err, message) {
			console.log(err || message);
		    });
		    pdftk.kill();
		});
		pdftk.stderr.on('data', function (data) {
		    console.log('stderr: ' + data);
		});

	    });
	});
    });
};
