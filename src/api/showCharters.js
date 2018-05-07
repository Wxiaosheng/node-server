const mysql_connect = require('./common/mysql_connect')

var showchapters = function(data, response){
    var resp = {};
    var connection = mysql_connect();
    var sql = `SELECT 
            b_id as id,
            b_chapter as chapter,
            b_chapter_name as chapterName,
            b_info as info
        FROM 
            book_chapter
        WHERE
            b_id=${data.id};`
    
    connection.query(sql, (err, data) => {
        if (err) { console.log(err) }
        resp.errorCode = '';
        resp.chapters = data
        response.writeHead(200, {'Content-Type': 'application/json;charset=UTF-8'});
        response.end(JSON.stringify(resp));
    })
}

module.exports = showchapters;