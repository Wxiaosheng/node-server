const mysql_connect = require('./common/mysql_connect')

var showBooks = function(data, response){
    var resp = {};
    var connection = mysql_connect();
    var sql = `
        SELECT 
            a.b_id as id,
            a.b_name as name,
            b.b_author as author,
            b.b_img as img,
            b.b_category as category,
            b.b_descript as descript
        FROM 
            books a, book_info b 
        WHERE 
            a.b_id=b.b_id;`
    connection.query(sql, (err, result) => {
        if(err) { console.log(err) }
        resp.errCode = '';
        resp.books = result;
        response.writeHead(200, {'Content-Type': 'application/json;charset=UTF-8'});
        response.end(JSON.stringify(resp));
    })
}

module.exports = showBooks;