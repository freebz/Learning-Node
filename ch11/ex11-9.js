// 예제 11-9. chainer를 사용하여 여러 개의 개체 인스턴스 추가를 단순화

var Sequelize = require('sequlize');

var sequelize = new Sequelize('databasenm',
			      'username', 'password',
			      { logging: false});

// 모델 정의
var Nodetest2 = sequelize.define('nodetest2',
  {id : {type: Sequelize.INTEGER, primaryKey: true},
   title : {type: Sequelize.STRING, allowNull: false, unique: true},
   text : Sequelize.TEXT,
  });

// 동기화
Nodetest2.sync().error(function(err) {
    console.log(err);
});
var chainer = new Sequelize.Utils.QueryChainer;
chainer.add(Nodetest2.create({title: 'A second object',text: 'second'}))
    .add(Nodetest2.create({title: 'A third object', text: 'third'}));

chainer.run()
    .error(function(errors) {
	console.log(errors);
    })
    .success(function() {
	Nodetest2.findAll().success(function(tests) {
	    console.log(tests);
	});
    });
