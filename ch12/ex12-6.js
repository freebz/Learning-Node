// 예제 12-6. Node 애플리케이션에서 ImageMagick를 사용해서 사진에 폴라로이드 효과 적용

var spawn = require('child_process').spawn;

// 사진을 가져옴
var photo = process.argv[2];
// 변환 배열
var opts = [
    photo,
    "-bordercolor", "snow",
    "-border", "6"
    "-background","grey60",
    "-background", "none", "-rotate", "6",
    "-background", "black",
    "(", "+clone", "-shadow", "60x4+4+4", ")",
    "+swap",
    "-background", "none",
    "-flatten", photo + ".png"];

var im = spawn('convert', opts)
