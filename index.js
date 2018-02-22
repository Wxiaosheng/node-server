// 小说APP后台的入口
//  var fs = require('fs');
//  var http = require('http');
//  var util = require('util');
  var mysql = require('mysql');
//  var url = require('url');
//  var querystring = require('querystring');

//  var server = http.createServer(function(request, response){
//      response.setHeader("Access-Control-Allow-Origin", "*"); 
//      console.log(request.url)
//      var urlObj = url.parse(request.url);
//      console.log(urlObj)
//      var post = '';
//      request.on('data', function(chunk){ 
//         console.log(chunk.toString())
//         post += chunk;
//      });
//      request.on('end', function(){   
//         console.log(post) 
//         post = querystring.parse(post);
//         console.log(post)
//         // response.header("Access-Control-Allow-Origin", "*");
//         // response.header("Access-Control-Allow-Headers", "X-Requested-With");
//         // response.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//         // response.header("X-Powered-By",' 3.2.1')
//         // response.header("Content-Type", "application/json;charset=utf-8");
//         response.end(util.inspect(post));
//      });
//      if(urlObj.pathname.indexOf('api')){
//         console.log('接口请求')
//      }
//  });

 //server.listen(9999, () => console.log('开始监听9999端口'));

 var connection = mysql.createConnection({
    host     : '106.15.201.255',
    user     : 'root',
    password : '123456',
    database : 'bookbase'
  });

  connection.connect(function(err, result){
      console.log(err)
      console.log(result)
  });

  var sql = 'SELECT * FROM books;'
  connection.query(sql, function(err, result){
    if(err){console.log(err)}
    console.log(result);
    //console.log(result[0])
  })



//  fs.open('login.txt', 'r', function(err, data){
//      //console.log(err)
//      console.log(data.toString())
//  })
//  fs.stat('login.txt', function(err, data){
//     console.log(data)
//  })
//  var server = http.createServer(function(request, response){
//     console.log('--------------------')
//     //console.dir(request);
//     //console.log(response);
//     console.log('--------------------')
//     var str = '';
//     // str += JSON.stringify(request.headers);
//     // str += 'url: ' + JSON.stringify(request.url);
//     // str += 'method: ' + JSON.stringify(request.method);
//     str = util.inspect(request,false,1,true);
//     console.log(str)
//     fs.writeFile('login.txt', str);
//  });

//  server.listen(9999);

// var buf = Buffer.alloc(10);
// buf.write('abcdefg');
// console.log(buf.toString());
// buf.write('1234');
// console.log(buf.toString());


// var data = fs.readFileSync('README.md');

// console.log('ready')

// console.log(data)
//console.log(data.toString())

// var mysql = require('mysql');

// console.log('start')

// const coon = mysql.createConnection({
//     host: '127.0.0.1',
//     user: 'root',
//     password: 'xs993436',
//     database: 'test'
// });

// let sql = 'SELECT * FROM user;';
// console.log('query')
// coon.query(sql, function(err, result){
//     console.dir(result);
// });

// coon.end();

// console.log('stop');

// console.log(__dirname)
// console.log(__filename)
// console.log(process.platform);
// console.log(process.memoryUsage())