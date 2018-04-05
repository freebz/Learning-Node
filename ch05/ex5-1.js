// 예제 5-1. 예전에 구현된 Node의 promise를 사용

function test_and_load(filename) {
    var promise = new process.Promise();
    fs.stat(filename).addCallback(function (stat) {

	// 파일이 아닌 것은 걸러냄
	if (!stat.isFile()) { promise.emitSuccess(); return; }

	// 파일인 경우 읽어 들임
	fs.readFile(filename).addCallback(function (data) {
	    promise.emitSuccess(data);
	}).addErrback(function (error) {
	    promise.emitError(error);
	});

    }).addErrback(function (error) {
	promise.emitError(error);
    });
    return promise;
}
