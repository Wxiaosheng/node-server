var mysql = require('mysql');

var showchapters = function(data, response){
    var resp = {};
    var connection = mysql.createConnection({
            host     : '106.15.201.255',
            user     : 'root',
            password : '123456',
            database : 'bookbase'
        });
    var sql = 'SELECT b_id,b_chapter,b_chapter_name FROM chapter;'
    console.log(data.code)
    if(data.code){
        sql = 'SELECT b_chapter,b_chapter_name, info FROM chapter;'
    }
    console.log(sql)
    connection.query(sql, (err, data) => {
        if (err) { console.log(err) }
        resp.errorCode = '0';
        resp.responseBody = {chapters: data}
        response.writeHead(200, {'Content-Type': 'application/json;charset=UTF-8'});
        response.end(JSON.stringify(resp));
    })
}

module.exports = showchapters;