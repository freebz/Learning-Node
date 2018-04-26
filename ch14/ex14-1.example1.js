// 예제 14-1. 전체 6개의 테스트를 실행하는 2개의 테스트 단위로 된 Nodeunit 테스트 스크립트

var util = require('util');

module.exports = {
    'Test 1' : function(test) {
	test.expect(4);
	test.equal(true, util.isArray([]));
	test.equal(true, util.isArray(new Array(3)));
	test.equal(true, util.isArray([1,2,3]));
	test.notEqual(true, (1 > 2));
	test.done();
    },
    'Test 2' : function(test) {
	test.expect(2);
	test.deepEqual([1,2,3], [1,2,3]);
	test.ok('str' === 'str', 'equal');
	test.done();
    }
};
