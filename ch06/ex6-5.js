// 예제 6-5. 파일로 로그를 기록하고 logger 형식을 변경하도록 설정

var connect = require('connect'),
    http = require('http'),
    fs = require('fs'),
    __dirname = '/home/examples';
var writeStream = fs.createWriteStream('./log.txt',
      {'files' : 'a',
       'encoding' : 'utf8',
       'mode' : 0666});

http.createServer(connect()
   .use(connect.logger({format : 'dev', stream : writeStream }))
   .use(connect.static(__dirname + '/public_html'))
   ).listen(8124);
