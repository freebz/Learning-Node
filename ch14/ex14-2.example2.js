// 예제 14-2. batch 1개, 컨텍스트 1개, topic 1개, vow 2개로 구성된 Vows 테스트 애플리케이션

var vows = require('vows'),
    assert = require('assert');

var circle = require('./circle');

var suite = vows.describe('Test Circle');

suite.addBatch({
    'An instance of Circle': {
	topic: circle,
	'should be able to calculate circumference': function (topic) {
	    assert.equal (topic.circumference(3.0), 18.8496);
	},
	'should be able to calculate area': function(topic) {
	    assert.equal (topic.area(3.0), 28.2743);
	}
    }
}).run();
