// 小说APP后台的入口
// var fs = require('fs');

var buf = Buffer.alloc(10);
buf.write('abcdefg');
console.log(buf.toString());
buf.write('1234');
console.log(buf.toString());


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