// 예제 7-7. 라우팅 경로를 컨트롤러 개체 메서드에 매핑하는 함수

exports.mapRoute = function(app, prefix) {

    prefix = '/' + prefix;

    var prefixObj = require('./controllers/' + prefix);

    // 색인
    app.get(prefix, prefixObj.index);

    // 추가
    app.get(prefix + '/new', prefixObj.new);

    // 조회
    app.get(prefix + '/:id', prefixObj.show);

    // 생성
    app.post(prefix + '/create', prefixObj.create);

    // 편집
    app.get(prefix + '/:id/edit', prefixObj.edit);

    // 업데이트
    app.put(prefix + '/:id', prefixObj.update);

    // 제거
    app.del(prefix + '/:id', prefixObj.destroy);

};
