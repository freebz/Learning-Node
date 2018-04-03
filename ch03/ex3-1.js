// 예제 3-1. stdin과 stdout으로 데이터를 읽고 쓰기

process.stdin.resume();
process.stdin.on('data', function (chunk) {
    process.stdout.write('data: ' + chunk);
})
