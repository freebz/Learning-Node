// 예제 3-12. EventEmitter 기능에 대한 기본적인 테스트

var eventEmitter = require('events').EventEmitter;
var counter = 0;

var em = new eventEmitter();
setInterval(function() { em.emit('timed', counter++); }, 3000);

em.on('timed', function(data) {
    console.log('timed ' + data);
});
