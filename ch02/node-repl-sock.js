var repl = require("repl"), net = require("net");

// ignoreUndefined를 true로 설정하여 REPL을 시작
repl.start("node via stdin> ", null, null, null, true);

net.createServer(function (socket) {
    repl.start("node via TCP socket> ", socket);

}).listen(8124);
