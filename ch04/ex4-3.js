// 예제 4-3. InputChecker 테스트 애플리케이션

var inputChecker = require('inputcheck').inputChecker;

// 새로운 개체 및 이벤트 처리 테스트
var ic = new inputChecker('Shelley', 'output');

ic.on('write', function(data) {
    this.writeStream.write(data, 'utf8');
});

ic.addListener('echo', function( data) {
    console.log(this.name + ' wrote ' + data);
});
ic.on('end', function() {
    process.exit();
});

process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', function(input) {
    ic.check(input);
});
