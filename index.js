var http  = require("http");
var request = require("request");
var cheerio = require("cheerio");
var fs = require("fs")
request('http://www.hengtao.cn/m.php',function(err,result){
    if(err){
        console.log(err);
    }

    // console.log(result.body);
    var $ = cheerio.load(result.body);
    $("img").each(function(index,element){
    	var img = "http://www.hengtao.cn" + $(element).attr("src")
    	var arr = $(element).attr("src").split("/");
    	var name =  arr[arr.length - 1]
    	var createWriteStream = fs.createWriteStream(`./images/${name}`)
		http.get(img,function(res){
			res.pipe(createWriteStream)
		})
		
    })

})
