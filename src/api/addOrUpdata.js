var mysql = require('mysql');

var constant = require('../constant/constant')

function addOrUpdata(data, response){
    console.log(data.type)
    var connect = mysql.createConnection({
        host     : constant.DB_HOST_NAME,
        user     : constant.DB_USER,
        password : constant.DB_PWD,
        database : constant.DB_NAME
    })
    var sql = '';
    if(data.type == 'add'){
        sql = `INSERT INTO chapter VALUE(
            NULL, '${data.code}', '${data.No}', '${data.title}', '${data.info}'
        )`
        console.log(sql)
        connect.query(sql, (err, result) => {
            if (err) console.log(err)
            console.log(result)
        })
    }
    if(data.type == 'updata'){
        
    }
}

module.exports = addOrUpdata;