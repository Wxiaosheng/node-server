const mysql_connect = require('./common/mysql_connect')

var showchapters = function(data, response){
    var resp = {};
    var connection = mysql_connect();
    var sql = `SELECT b_id,b_name FROM books WHERE b_id='${data.id}' ;SELECT b_chapter as chapter,b_chapter_name as chapterName,b_info as info FROM book_chapter WHERE b_id='${data.id}';`
    
    connection.query(sql, (err, result) => {
        if (err) { console.log(err) }
        resp.errorCode = '';
        resp.id = result[0][0].b_id
        resp.bookName = result[0][0].b_name
        resp.chapters = result[1]
        response.writeHead(200, {'Content-Type': 'application/json;charset=UTF-8'});
        response.end(JSON.stringify(resp));
    })
}

module.exports = showchapters;