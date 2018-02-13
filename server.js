/**
 * 使用http模块向客户端返回响应消息
 */

var http = require('http');

//1创建一个Web服务器 —— 创建一个面包售货员
var server = http.createServer();

//2让Web服务器能够处理客户端连接请求——岗前培训
server.on('request',function(request, response){
    console.log('Web服务器接收到一个HTTP请求');

    //设置响应状态码 和 响应头部
    response.writeHead(200, {
        'Content-Type': 'text/html;charset=UTF-8',
        'Cache-Control': 'no-cache'
    });
    response.write('<h1>I am Node.js Server</h1>');  //输出响应主体
    response.write('<p>欢迎访问我的Web服务器</p>');
    response.end();  //结束响应主体的输出
})

//3让Web服务器开始监听指定端口——开始上岗
server.listen(9090, '0.0.0.0', function(){
    console.log('Web服务器开始监听9090端口')
})