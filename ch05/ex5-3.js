// 예제 5-3. 순차적 동기 애플리케이션

var fs = require('fs');

try {
    var data = fs.readFileSync('.apples.txt','utf8');
    console.log(data);
    var adjData = data.replace(/[A|a]pple/g,'orange');

    fs.writefileSync('.oranges.txt', adjData);
} catch(err) {
    console.error(err);
}
