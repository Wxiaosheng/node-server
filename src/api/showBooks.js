var mysql = require('mysql');

var showBooks = function(data, response){
    var resp = {};
    var connection = mysql.createConnection({
            host     : '106.15.201.255',
            user     : 'root',
            password : '123456',
            database : 'bookbase'
        });
    var sql = 'SELECT id,b_id,b_name FROM books;'
    connection.query(sql, (err, result) => {
        if(err) { console.log(err) }
        console.log(result)
        resp.errCode = '1';
        resp.responseBody = {books: result}
        response.writeHead(200, {'Content-Type': 'application/json;charset=UTF-8'});
        response.end(JSON.stringify(resp));
    })
}

module.exports = showBooks;