// 예제 12-3. PDF 업로드 웹 서비스 애플리케이션

var connect = require('connect');
var pdfprocess =require('./pdfprocess');

// POST인 경우 파일을 업로드하고 PDF 분할을 시작하며, ack 응답을 준다.
function upload(req, res, next){
    if ('POST' != req.method) return next();

    res.setHeader('Content-Type', 'text/html');
    if (req.files.pdffile && req.files.pdffile.type === 'application/pdf') {
	res.write('<p>Thanks ' + req.body.username +
		  ' for uploading ' + req.files.pdffile.name + '</p>');
	res.end("<p>You'll receive an email with file links when processed.</p>");

	// post 업로드 처리
	pdfprocess.processFile(req.body.username, req.body.email,
			       req.files.pdffile.path, req.files.pdffile.name);
    } else {
	res.end('The file you uploaded was not a PDF');
    }
}
// 저 순서대로 use를 등록해야 한다는 것입니다.
connect()
    .use(connect.bodyParser({uploadDir: __dirname + '/pdfs'}))
    .use(connect.static(__dirname + '/public'))
    .use(upload)
    .use(connect.directory(__dirname + '/public'))
    .listen(8124);
console.log('Server started on port 8124');
