var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

var map = require('./maproutecontroller');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
/*
app.use(function(req, res, next) {
    throw new Error(req.url + ' not found');
});
app.use(function(err, req, res, next) {
    console.log(err);
    res.send(err.message);
});
*/

app.use('/', index);
app.use('/users', users);

app.get(/^\/node?(?:\/(\d+)(?:\.\.(\d+))?)?/, function(req, res) {
    console.log(req.params);
    res.send(req.params);
});

app.get('/content/*', function(req, res) {
    res.send(req.params);
});

app.get("/products/:id/:operation?", function(req, res) {
    console.log(req);
    res.send(req.params.operation + ' ' + req.params.id);
});


var prefixes = ['widgets'];

// 컨트롤러에 라우팅 ㄱ여로를 매핑
prefixes.forEach(function(prefix) {
    map.mapRoute(app, prefix);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
