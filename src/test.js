// const assgin = require('object-assign')
// const process = require('process')

// var cp = require('child_process');

// console.log(assgin({type: 'A'}, {name: 'assgin'}))
// console.log(assgin({type: 'A'}, {name: 'assgin'}, Array))

// console.log(process.pid)
// console.log(process.version)
// console.log(process.versions)
// console.log(process.title)
// console.log(process.argv)

var mysql = require('mysql');

var connection = mysql.createConnection({
        host     : '127.0.0.1',
        user     : 'root',
        password : 'xs993436',
        database : 'bookbase'
});

connection.query('select * from test.user a,bookbase.books b where a.uid=b.id;', (err, result) => {
    console.log(err, result)
})

console.log(process.env.NODE_ENV)
//process.nextTick(() => console.log('Next Loop.'))
//setTimeout(() => console.log('set'), 0)

//process.on('exit', function () {
//    console.log('This MUST be saved on exit.');
//});
// var options = { 
//     encoding: 'utf8',
//     timeout: 0,
//     maxBuffer: 200 * 1024,
//     killSignal: 'SIGTERM',
//     setsid: false,
//     cwd: null,
//     env: null 
// };

//cp.exec('ls', options, (e, a, b) => {
    //console.log(e)
    //console.log(a)
    //console.log(b)
//})

