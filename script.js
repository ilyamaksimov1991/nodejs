var fs = require('fs');
var url = require('url'); // парсинг url
var http = require('http');
var path = require('path'); // работа с путями
//var mine = require('mine'); // работа с путями

var ROOT = __dirname + "\\file";
http.createServer(function (req, res) {

    if (!checkAccess(req)) {
        res.statusCode = 403;
        res.end('no secret access')
    }
    sendFileSafe(url.parse(req.url).pathname, res);


}).listen(3000);

/* функция проверки */
function checkAccess(req) {
    url.parse(req.url).query == '555';
    return true;
}
/* функция проверки */
function sendFileSafe(filePath, res) {

    try {
        filePath = decodeURIComponent(filePath)
    } catch (e) {
        res.statusCode = 400;
        res.end('Bad request');
        return;
    }

    if (~filePath.indexOf('\0')) { // проверка на нулевой байт
        res.statusCode = 400;
        res.end('Bad request2');
        return;
    }

   // console.log('a1-', filePath);
    filePath="index.html";

    filePath = path.normalize(path.join(ROOT, filePath));
    console.log('a2-', filePath);

    if (filePath.indexOf(ROOT) !== 0) { // проверка на нулевой байт
        res.statusCode = 404;
        res.end('Bad request3');
        return;
    }

    fs.stat(filePath, function (err, stats) { // проверка на файл
        if (err || !stats.isFile()) {
            res.statusCode = 404;
            res.end('Bad 4');
            return;
        }
    });
   // var pat= __dirname+"\\file";
   // console.log(ROOT);
   // console.log(pat);
sendFile(filePath,res)


}
function sendFile(pat,res) {
    fs.readFile(pat,function (err, content) {

        if(err) throw err;
        var mime =require('mime').lookup(pat);
        console.log(mime);
        //res.setHeader("Content-Type: text/html; charset=utf-8");
        res.end(content);

    })
}

