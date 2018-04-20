// 예제 8-8. 뷰를 구현한 위젯 컨트롤러

var widgets = [
    { id : 1,
      name : 'The Great Widget',
      price : 1000.00,
      desc: "A widget of great value"
    }
]

// 위젯 색인 목록: /widgets/
exports.index = function(req, res) {
    res.render('widgets/index', {title : 'Widgets', widgets : widgets});
};

// 새 위젯 폼을 표시
exports.new = function(req, res) {
    var filePath = require('path').normalize(__dirname + "/../public/widgets/new.html");
    res.sendfile(filePath);
};

// 위젯 추가
exports.create = function(req, res) {

    // 위젯 id 생성
    var indx = widgets.length + 1;

    // 위젯 추가
    widgets[widgets.length ] =
	{ id : indx,
	  name : req.body.widgetname,
	  price : parseFloat(req.body.widgetprice),
	  desc : req.body.widgetdesc };

    // 콘솔로 출력하고 추가를 사용자에게 확인
    console.log(widgets[indx-1]);
    res.render('widgets/added', {title: 'Widget Added', widget : widgets[indx-1]});
};

// 위젯 표시
exports.show = function(req, res) {
    var indx = parseInt(req.params.id) - 1;
    if (!widgets[indx])
	res.send('There is no widget with id of ' + req.params.id);
    else
	res.render('widgets/show', {title : 'Show Widget', widget : widgets[indx]});
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
    var indx = parseInt(req.params.id) - 1;
    res.render('widgets/edit', {title : 'Edit Widget', widget : widgets[indx]});
};

// 위젯 업데이트
exports.update = function(req, res) {
    var indx = parseInt(req.params.id) - 1;
    widgets[indx] =
	{ id : indx + 1,
	  name : req.body.widgetname,
	  price : parseFloat(req.body.widgetprice),
	  desc : req.body.widgetdesc}  console.log(widgets[indx]);
    res.render('widgets/added', {title: 'Widget Edited', widget : widgets[indx]}
};
