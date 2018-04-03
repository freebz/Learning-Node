// 예제 3-11. util.inherits 메서드를 통한 개체 상속

var util = require('util');

// 원래 개체를 정의
function first() {
    var self = this;
    this.name = 'first';
    this.test = function() {
	console.log(self.name);
    };
}

first.prototype.output = function() {
    console.log(this.name);
}

// first로부터 상속
function second() {
    second.super_.call(this);
    this.name = 'second';
}
util.inherits(second,first);

var two = new second();
function third(func) {
    this.name = 'third';
    this.callMethod = func;
}

var three = new third(two.test);

// 모두 "second"를 출력해야 함
two.output();
two.test();
three.callMethod();
