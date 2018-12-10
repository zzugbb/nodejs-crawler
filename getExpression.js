var fs = require('fs');
var Crawler  = require("crawler");
var request = require('request');
 

//----------第一种写法开始-----------------
var dir1 = './expression';
var baseUrl = 'http://www.dianxiaomi.com/static/img/smile/';  //0fixed.png
fs.mkdir(dir1, function(err){
  if (err) {
    return console.error(err);
  } else {
    console.log(dir1 + "目录创建成功");
    for (var i = 0; i < 100; i++){
      var url = baseUrl + i + 'fixed.png';
      var fileName = i + 'fixed.png';
      download(url, fileName);
    }
  }
})

function download(url, filename) {
  request.head(url, function(err, res, body) {
    request(url).pipe(fs.createWriteStream(dir1 + "/" + filename));
    console.log("方法-:" + filename + " 爬取完毕");
  })
}
//----------第一种写法结束-----------------


//----------第二种写法开始-----------------
var dir2 = './expression2';

fs.mkdir(dir2, function(err){
  if (err) {
    return console.error(err);
  } else {
    console.log(dir2 + "目录创建成功");

    var imgArray = new Array();
    for (let i = 0; i < 100; i++) {
      var data = {
        uri: "http://www.dianxiaomi.com/static/img/smile/" + i + "fixed.png",
        filename: i + "fixed.png",
        callback: function (error, res, done) {
          if (error){
            console.log(error);
          } else {
            fs.createWriteStream(dir2 + "/" + res.options.filename).write(res.body);
            console.log("方法二:"  + i + "fixed.png" + " 爬取完毕");
          }
          done();
        }
      }
      imgArray.push(data);
    }

    c.queue(imgArray);
  } 
}) 

var c = new Crawler({
  maxConnections : 10,
  encoding : null,
  jQuery: false,
  callback : function (error, res, done) {
    if (error){
      console.log(error);
    }
    done();
  }
});

//----------第二种写法结束-----------------