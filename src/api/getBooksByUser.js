var mysql = require('mysql');
var constant = require('../constant/constant')

function getBooksByUser(data, response) {
    var { userId } = data;
    var rep = {
        errCode: '',
        bookList: []
    };
    var connection = mysql.createConnection({
        host     : constant.DB_HOST_NAME,
        user     : constant.DB_USER,
        password : constant.DB_PWD,
        database : constant.DB_NAME
    })
    var sql = `SELECT book_id FROM b_user_book WHERE user_id = '${userId}' `;
    connection.query(sql, (err, result) => {
        if(err) console.log(err)
        console.log(result.length)
        for(let i=0; i<result.length; i++){
           let _sql = `SELECT * FROM books WHERE b_id = '${result[i].book_id}'`;
           connection.query(_sql, (err, result) => {
               console.log(result)
               if(err) console.log(err)
               if(result.length > 0){
                    rep.bookList.push(result[0])
               }
               console.log(i)
            if(i == result.length-1){
                rep.errCode = 'success'
                response.writeHead(200, {'Content-Type': 'application/json;charset=UTF-8'});
                response.end(JSON.stringify(rep));  
            }
           })
        }

    })
}

module.exports = getBooksByUser