// 예제 7-5. 위젯을 편집하고 삭제하는 기능 및 모든 위젯을 나열하는 기능을 포함하도록 수정된 위젯 애플리케이션

var express = require('express')
  , http = require('http')
  , app = express();

app.configure(function(){
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.static(__dirname + '/public'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

// 모모리 데이터 저장소
var widgets = [
    { id : 1,
      name : 'My Sepcial Widget',
      price : 100.00,
      descr : 'A widget beyond price'
    }
]

// /widgets/에 대한 index
app.get('/widgets', function(req, res) {
    res.send(widgets);
});

// 특정 위젯을 조회
app.get('/widgets/:id',
  function(req, res) {
      var indx = parseInt(req.prams.id) - 1;
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
app.del('/widgets/:id/delete',
  function(req,res) {
      var indx = req.params.id - 1;
      delete widgets[indx];
      console.log('deleted ' + req.params.id);
      res.send('deleted ' + req.params.id);
  });

// 위젯 업데이트/편집
app.put('/widgets/:id/update', function(req,res) {
    var indx = parseInt(req.params.id) - 1;
    widgets[indx] =
	{ id : indx,
	  name : req.body.widgetname,
	  price : parseFloat(req.body.widgetprice),
	  descr : req.body.widgetdesc };
    console.log(widgets[indx]);
    res.send ('Updated ' + req.params.id);
});

http.createServer(app).listen(3000);

console.log("Express server listening on port 3000");
