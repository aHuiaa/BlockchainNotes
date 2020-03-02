var http = require("http");
var url = require("url");
var querystring = require('querystring');

function start(route, handle) {
	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;
		var body = '';
		//每当接收到请求体数据，累加到post中
		request.on('data', function (chunk) {
			body += chunk;  //一定要使用+=，如果body=chunk，因为请求favicon.ico，body会等于{}
		});
		//async、await处理异步请求
		request.on('end', async function () {
			// 解析参数
			body = querystring.parse(body);  //将一个字符串反序列化为一个对象
			response.writeHead(200, { "Content-Type": "text/json" });
			var content = await route(handle, pathname, body);
			response.write(JSON.stringify(content));
			response.end();
		});

	}
	http.createServer(onRequest).listen(5555);
	console.log("Server has started..");
}

exports.start = start;