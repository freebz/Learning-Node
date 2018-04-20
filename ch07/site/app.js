var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

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

// 메모리 데이터 저장소
var widgets = [
    { id : 1,
      name : 'My Special Widget',
      price : 100.00,
      descr : 'A widget beyond price'
    }
]

// /widgets/에 대한 index
app.get('/widgets', function(req, res) {
    res.send(widgets);
});

// 특정 위젯을 조회
app.get('/widgets/:id', function(req, res) {
    var indx = parseInt(req.params.id) - 1;
    if (!widgets[indx])
	res.send('There is no widget with id of ' + req.params.id);
    else
	res.send(widgets[indx]);
});

// 위젯 추가
app.post('/widgets/add', function(req, res) {
    var indx = widgets.length + 1;
    widgets[widgets.length] =
	{ id : indx,
	  name : req.body.widgetname,
	  price : parseFloat(req.body.widgetprice),
	  descr : req.body.widgetdesc };
    console.log('added ' + widgets[indx-1]);
    res.send('Widget ' + req.body.widgetname + ' added with id ' + indx);
});

// 위젯 삭제
app.del('/widgets/:id/delete', function(req, res) {
    var indx = req.params.id - 1;
    delete widgets[indx];
    console.log('deleted ' + req.params.id);
    res.send('deleted ' + req.params.id);
});

// 위젯 업데이트/편집
app.put('/widgets/:id/update', function(req, res) {
    var indx = parseInt(req.params.id) - 1;
    widgets[indx] =
	{ id : indx,
	  name : req.body.widgetname,
	  price : parseFloat(req.body.widgetprice),
	  descr : req.body.widgetdesc };
    console.log(widgets[indx]);
    res.send('Updated ' + req.params.id);
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
