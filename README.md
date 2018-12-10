# nodejs-crawler

`nodejs` 抓取页面数据，批量下载图片表情等

## getEmoji-爬取表情

```js
npm install
node getEmoji.js
```

从对应的图片地址，批量下载保存到本地。

两种不同的方式爬取表情, 方法一 :  `node-request`, 方法二 : `node-crawler`

## getStickersFromHtml-爬取网页内容

```js
npm install
node getStickersFromHtml.js
```

从 网站不同的 `html页面` 进行爬虫，根据页面结构，分析从而获取需要的数据。

从 [表情包网站](https://www.fabiaoqing.com/biaoqing) 爬取最热表情包。注意: 爬取地址见前面, 由于分页，从各个页面抓取.

## 相关资料

### node-crawler

> `node-crawler` 是一个轻量级的 `node.js` 爬虫工具，兼顾了高效与便利性，支持分布式爬虫系统，支持硬编码，支持http前级代理。

### 参考资料

* [node-crawler官网](http://nodecrawler.org/)
* [node-crawler：一个轻量级爬虫工具](https://node-crawler.readthedocs.io/zh_CN/latest/)