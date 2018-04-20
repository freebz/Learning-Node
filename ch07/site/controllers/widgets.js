// 예제 7-6. 위젯 컨트롤러

var widgets = [
    { id : 1,
      name : 'The Great Widget',
      price : 1000.00
    }
]

// 위젯 색인 목록
exports.index = function(req, res) {
    res.send(widgets);
};

// 새 위젯 폼을 표시
exports.new = function(req, res) {
    res.send('displaying new widget form');
};

// 위젯 추가
exports.create = function(req, res) {
    var indx = widgets.length + 1;
    widgets[widgets.length ] =
	{ id : indx,
	  name : req.body.widgetname,
	  price : parseFloat(req.body.widgetprice)
	};
    console.log(widgets[indx-1]);
    res.send('Widget ' + req.body.widgetname + ' added with id ' + indx);
};

// 위젯 조회
exports.show = function(req, res) {
    var indx = parseInt(req.params.id) - 1;
    if (!widgets[indx])
	res.send('There is no widget with id of ' + req.params.id);
    else
	res.send(widgets[indx]);
};

// 위젯 삭제
exports.destroy = function(req, res) {
    var indx = req.params.id - 1;
    delete widgets[indx];
    console.log('deleted ' + req.params.id);
    res.send('deleted ' + req.params.id);
};

// 편집 폼 표시
exports.edit = function(req, res) {
    res.send('displaying edit form');
};

// 위젯 업데이트
exports.update = function(req, res) {
    var indx = parseInt(req.params.id) - 1;
    widgets[indx] =
	{ id : indx,
	  name : req.body.widgetname,
	  price : parseFloat(req.body.widgetprice)}
    console.log(widgets[indx]);
    res.send ('Updated ' + req.params.id);
};
