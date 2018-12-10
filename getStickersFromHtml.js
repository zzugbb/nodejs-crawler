var fs = require('fs');
var Crawler  = require("crawler");
var request = require('request');

//初始化配置
var c = new Crawler({
  maxConnections : 10,
  callback : function (error, res, done) {
    if (error) {
      console.log(error);
    } 
    done();
  }
});

var urlArray = new Array();
for (var i = 1; i < 10; i++) {
  var data = {
    uri: "https://www.fabiaoqing.com/biaoqing/lists/page/" + i + ".html",
    jQuery: true,
    callback: function (error, res, done) {
      if (error) {
        console.log(error);
      } else {
        var $ = res.$;
        getStickersUrl($);
      }
      done();
    }
  }
  urlArray.push(data);
}

//爬取对应页面
c.queue(urlArray);

var dir = "./stickers";
/**
 * 获取表情包地址
 * @param {*} jQuery 
 */
function getStickersUrl(jQuery) {
  var obj = jQuery(".lazy");
  var stickersUrlArray = new Array(); //表情包url相关数组
  for(var i = 0; i < obj.length; i++) {
    var data = {
      url: obj[i].attribs["data-original"],
      name: obj[i].attribs.title,
    }
    stickersUrlArray.push(data);
  }
  if (stickersUrlArray.length > 0) {
    if (!fs.existsSync(dir)) {
      fs.mkdir(dir, function(err){
        if (err) {
          return console.error(err);
        } else {
          for (let i = 0; i < stickersUrlArray.length; i++) {
            var parts = stickersUrlArray[i].url.split('/');
            downStickers(stickersUrlArray[i].url, parts[parts.length-1]);
          }  
        }
      })
    } else {
      for (let i = 0; i < stickersUrlArray.length; i++) {
        var parts = stickersUrlArray[i].url.split('/');
        downStickers(stickersUrlArray[i].url, parts[parts.length-1]);
      }  
    }
  } 
}


/**
 * 下载对应表情包
 * @param {*} url 
 * @param {*} filename 
 */
function downStickers(url, filename) {
  request.head(url, function(err, res, body) {
    request(url).pipe(fs.createWriteStream(dir + "/" + filename));
  })
}


