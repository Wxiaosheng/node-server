/*
    静态资源服务器：
        负责处理 .html .css image 等请求
*/

var http = require('http');
var url = require('url');
var fs = require('fs');

var routes = require('./route/route');

var server = http.createServer( (request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*"); 
    var urlObj = url.parse(request.url);
    var route = urlObj.pathname.slice(1);
    if(route === 'api'){
        console.log('动态请求')
        var post = '';
        request.on('data', (chunk) => {
            post += chunk;
        })
        request.on('end', () => {
            console.log(post) 
            post = JSON.parse(post)
            routes(post, response);
            return ;
        });
        return ;
    }
    var extName = getExtendName(urlObj.pathname);
    var contentType = 'text/html;charset=UTF-8';
    switch (extName){
        case 'jpg':
            contentType = 'image/jpeg';
            break;
        case 'png':
            contentType = 'image/png';
            break;
        case 'gif':
            contentType = 'image/gif';
            break;
        case 'ico': 
            contentType = 'image/x-icon';
            break;
        case 'css':
            contentType = 'text/css; charset=utf-8';
            break;
        case 'js':
            contentType = 'application/javascript';
            break;
        case 'html':
            break;
        default: 
            response.writeHead(200, {
                'Content-Type': contentType,
                'Cache-Control': 'no-cache'
            });
            response.end(`本网站不支持${extName}格式的文件！`);
            return ;
    }
    var buffer = fs.readFileSync(`${__dirname}${urlObj.pathname}`);
    response.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache',
        'Server': 'Tianzun'
    });
    response.end(buffer);
});

function getExtendName(str) {
    var index = str.indexOf('.');
    var flag = typeof str === 'string' &&  index !== -1;
    if(!str || !flag){
        return '';
    }
    return str.slice(index+1);
}

server.listen('9999', () => console.log('start'));