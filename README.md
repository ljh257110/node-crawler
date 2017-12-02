# 用node实现简单的爬虫及写入文件操作
### 1.初始化项目文件
在对应的项目文件夹下执行```npm init```来初始化一个package.json文件
### 2.安装request和cheerio依赖包
request的功能就是建立起对目标网页的链接，并返回相应的数据<br>
cheerio的功能是用来操作dom元素的，他可以把request返回来的数据转换成可供dom操作的数据，更重要的cheerio的api跟jquery一样，用$来选取对应的dom结点<br>
安装request：```cnpm install request --save-dev```<br>
安装 cheerio：```cnpm install cheerio --save-dev```
### 3.引入依赖包并使用
（1）新建一个index.js文件
首先引入依赖
```js
var http  = require("http");
var request = require("request");
var cheerio = require("cheerio");
var fs = require("fs");
```
（2）调用request的接口
```js
request('http://www.hengtao.cn/m.php',function(err,result){
    if(err){
        console.log(err);
    }
    console.log(result.body);//爬取到完整页面
})
```
（3）终端运行```node index```,可爬取到页面<br>
（4）获取页面所有```img```节点,并通过```fs.createWriteStream```写入文件
```js
	var $ = cheerio.load(result.body);//声明全局$,用于DOM操作
    $("img").each(function(index,element){//遍历所有img标签
    	var img = "http://www.hengtao.cn" + $(element).attr("src")//获取页面所有图片的完整地址
    	var arr = $(element).attr("src").split("/");
    	var name =  arr[arr.length - 1]//给每个图片命名
    	var createWriteStream = fs.createWriteStream(`./images/${name}`)//将图片写入images文件夹
		http.get(img,function(res){
			res.pipe(createWriteStream)
		})//执行写入操作		
    })
```
