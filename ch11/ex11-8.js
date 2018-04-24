// 예제 11-8. Sequelize를 사용한 CRUD

var Sequelize = require('sequelize');

var sequelize = new Sequelize('databasenm',
		'username', 'password',
		{ logging: false});

// 모델 정의
var Nodetest2 = sequelize.define('nodetest2',
  {id : {type: Sequlize.INTEGER, primaryKey: true},
   title : {type: Sequlize.STRING, allowNull: false, unique: true},
   text : Sequlize.TEXT,
  });

// 동기화
Nodetest2.sync().error(function(err) {
    console.log(err);
});

var test = Nodetest2.build(
    { title: 'New object',
      text: 'Newest object in the data store'});
// 레코드 저장
test.save().success(function() {

    // 첫 번째 업데이트
    NOdetest2.find({where : {title: 'New object'}}).success(function(test) {
	test.title = 'New object title';
	test.save().error(function(err) {
	    console.log(err);
	});
	test.save().success(function() {

	    // 두 번째 업데이트
	    Nodetest2.find(
		{where : {title: 'New object title'}}).success(function(test) {
		    test.updateAttributes(

			{title: 'An even better title'}).success(function() {});
		    test.save().success(function() {

			// 전체를 찾음
			Nodetest2.findAll().success(function(tests) {
			    console.log(tests);

			    // 새 개체를 찾아서 파괴
			    Nodetest2.find({ where: {title: 'An even better title'}}).
				success(function(test) {
				    test.destroy().on('success', function(info) {
					console.log(info);
				    });
				});
			});
		    });
		})
	});
    });
});
